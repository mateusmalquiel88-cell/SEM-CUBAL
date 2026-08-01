async function bootDashboard() {
  const response = await fetch('/api/dashboard');
  const payload = await response.json();

  const statsGrid = document.getElementById('stats-grid');
  const statusBreakdown = document.getElementById('status-breakdown');
  const tasksBody = document.getElementById('tasks-table-body');

  const cards = [
    { label: 'Utilizadores', value: payload.summary.users },
    { label: 'Projetos', value: payload.summary.projects },
    { label: 'Tarefas', value: payload.summary.tasks },
    { label: 'Conclusão', value: `${payload.summary.completion_rate}%` },
  ];

  statsGrid.innerHTML = cards.map((card) => `
    <article class="card">
      <div class="label">${card.label}</div>
      <div class="value">${card.value}</div>
    </article>
  `).join('');

  statusBreakdown.innerHTML = payload.taskStatusBreakdown.map((item) => `
    <div class="status-item">
      <span class="badge">${item.status}</span>
      <strong>${item.total}</strong>
    </div>
  `).join('');

  tasksBody.innerHTML = payload.recentTasks.map((task) => `
    <tr>
      <td>${task.title}</td>
      <td><span class="badge">${task.status}</span></td>
      <td><span class="badge">${task.priority}</span></td>
      <td>${task.project_name || 'Sem projeto'}</td>
      <td>${task.assignee_name || 'Sem responsável'}</td>
    </tr>
  `).join('');
}

bootDashboard().catch((error) => {
  console.error('Unable to load dashboard data', error);
});
