const path = require('path');
const express = require('express');
const { add } = require('./index');
const { initDatabase, getDashboardData, listTasks } = require('./db');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to agents-continuar-projeto', sum: add(1, 2) });
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'dashboard.html'));
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const payload = await getDashboardData();
    res.json(payload);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await listTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function initializeApp() {
  await initDatabase();
  return app;
}

if (require.main === module) {
  initializeApp().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
}

module.exports = { app, initializeApp };
