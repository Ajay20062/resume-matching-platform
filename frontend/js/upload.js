document.getElementById("resumeForm").addEventListener("submit", async (e) => {
e.preventDefault();


const formData = new FormData();
const fileInput = document.querySelector("input[type=file]");
formData.append("resume", fileInput.files[0]);


const res = await fetch("http://localhost:5000/api/resume/upload", {
method: "POST",
body: formData
});


const data = await res.json();
document.getElementById("status").innerText = data.message;
});