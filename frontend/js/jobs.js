document.getElementById("jobForm").addEventListener("submit", async (e) => {
e.preventDefault();


const job = {
title: document.getElementById("title").value,
skills: document.getElementById("skills").value.split(","),
minExperience: Number(document.getElementById("exp").value)
};


const res = await fetch("http://localhost:5000/api/job", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(job)
});


const data = await res.json();
document.getElementById("jobStatus").innerText = data.message;
});