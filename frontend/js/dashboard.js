async function loadMatches() {
  const jobId = document.getElementById('jobId').value;
  if (!jobId) {
    alert('Please enter a Job ID');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/match/${jobId}`);
    const results = await response.json();

    const tbody = document.getElementById('results');
    tbody.innerHTML = '';

    results.forEach(result => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${result.candidate}</td>
        <td>${(result.matchScore * 100).toFixed(2)}%</td>
        <td>${result.skills || 'N/A'}</td>
        <td>${result.experience || 'N/A'} years</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById('results-container').style.display = 'block';
  } catch (error) {
    alert('Error loading matches: ' + error.message);
  }
}
