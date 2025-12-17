document.getElementById('jobForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const skills = document.getElementById('skills').value;
  const description = document.getElementById('description') ? document.getElementById('description').value : '';
  const location = document.getElementById('location') ? document.getElementById('location').value : '';
  const salary = document.getElementById('salary') ? document.getElementById('salary').value : '';

  const jobData = {
    title,
    skills: skills.split(',').map(s => s.trim()),
    description,
    location,
    salary
  };

  try {
    const response = await fetch('http://localhost:5000/api/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if available
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
    });

    const result = await response.json();
    document.getElementById('jobStatus').textContent = result.message || result.error;
  } catch (error) {
    document.getElementById('jobStatus').textContent = 'Error creating job: ' + error.message;
  }
});
