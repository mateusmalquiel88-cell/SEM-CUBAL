const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const defaultDbPath = path.join(__dirname, '..', 'data', 'sem-cubal.db');
const dbPath = process.env.DB_PATH || defaultDbPath;

let db = null;
let initialized = false;

function ensureDirectory() {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

function getDb() {
  if (!db) {
    ensureDirectory();
    db = new sqlite3.Database(dbPath);
  }
  return db;
}

function run(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().run(query, params, function (error) {
      if (error) {
        reject(error);
        return;
      }
      resolve(this);
    });
  });
}

function all(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows);
    });
  });
}

function get(query, params = []) {
  return new Promise((resolve, reject) => {
    getDb().get(query, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row);
    });
  });
}

async function initDatabase() {
  if (initialized) {
    return;
  }

  ensureDirectory();

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL DEFAULT 'member',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      owner_id INTEGER REFERENCES users(id),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      priority TEXT NOT NULL DEFAULT 'medium',
      project_id INTEGER REFERENCES projects(id),
      assignee_id INTEGER REFERENCES users(id),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await seedSampleData();
  initialized = true;
}

async function seedSampleData() {
  const userCount = await get('SELECT COUNT(*) AS count FROM users');
  if (Number(userCount.count) === 0) {
    await run(`
      INSERT INTO users (name, email, role) VALUES
      ('Ana Costa', 'ana@sem-cubal.dev', 'admin'),
      ('Bruno Silva', 'bruno@sem-cubal.dev', 'manager'),
      ('Cláudia Ramos', 'claudia@sem-cubal.dev', 'member')
    `);
  }

  const projectCount = await get('SELECT COUNT(*) AS count FROM projects');
  if (Number(projectCount.count) === 0) {
    await run(`
      INSERT INTO projects (name, status, owner_id) VALUES
      ('Plataforma de Monitorização', 'active', 1),
      ('Migração do Painel', 'planning', 2),
      ('Integração com CRM', 'active', 1)
    `);
  }

  const taskCount = await get('SELECT COUNT(*) AS count FROM tasks');
  if (Number(taskCount.count) === 0) {
    await run(`
      INSERT INTO tasks (title, description, status, priority, project_id, assignee_id) VALUES
      ('Definir métricas do painel', 'Criar cards para atividade, projetos e tarefas.', 'in_progress', 'high', 1, 1),
      ('Configurar relatório semanal', 'Adicionar dados agregados para os stakeholders.', 'pending', 'medium', 1, 2),
      ('Validar dados de clientes', 'Conectar leitura de dados do CRM para o dashboard.', 'done', 'high', 3, 3),
      ('Melhorar observabilidade', 'Adicionar logs da API do portal de gestão.', 'pending', 'low', 2, 2)
    `);
  }
}

async function getDashboardData() {
  const summary = await get(`
    SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM projects) AS projects,
      (SELECT COUNT(*) FROM tasks) AS tasks,
      (SELECT COUNT(*) FROM tasks WHERE status = 'done') AS completed_tasks
  `);

  const taskStatusBreakdown = await all(`
    SELECT status, COUNT(*) AS total
    FROM tasks
    GROUP BY status
    ORDER BY total DESC
  `);

  const recentTasks = await all(`
    SELECT t.id, t.title, t.status, t.priority, p.name AS project_name, u.name AS assignee_name
    FROM tasks t
    LEFT JOIN projects p ON p.id = t.project_id
    LEFT JOIN users u ON u.id = t.assignee_id
    ORDER BY t.created_at DESC, t.id DESC
    LIMIT 6
  `);

  return {
    summary: {
      ...summary,
      completion_rate: summary.tasks > 0 ? Math.round((summary.completed_tasks / summary.tasks) * 100) : 0,
    },
    taskStatusBreakdown,
    recentTasks,
  };
}

async function listTasks() {
  return all(`
    SELECT t.id, t.title, t.status, t.priority, t.created_at, p.name AS project_name, u.name AS assignee_name
    FROM tasks t
    LEFT JOIN projects p ON p.id = t.project_id
    LEFT JOIN users u ON u.id = t.assignee_id
    ORDER BY t.created_at DESC
  `);
}

async function resetDatabase() {
  if (db) {
    await new Promise((resolve, reject) => {
      db.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  db = null;
  initialized = false;

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
}

module.exports = {
  getDb,
  initDatabase,
  seedSampleData,
  getDashboardData,
  listTasks,
  resetDatabase,
};
