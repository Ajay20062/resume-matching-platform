document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('http://localhost:5000/api/resume/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `<div class="success">${data.message}</div>`;
        } else {
            resultDiv.innerHTML = `<div class="error">${data.error || 'Upload failed'}</div>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<div class="error">Network error: ${error.message}</div>`;
    }
});
