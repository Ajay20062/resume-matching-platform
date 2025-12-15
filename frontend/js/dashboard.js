async function loadMatches() {
const jobId = document.getElementById("jobId").value;
const res = await fetch(`http://localhost:5000/api/match/${jobId}`);
const data = await res.json();


const tbody = document.getElementById("results");
tbody.innerHTML = "";


data.forEach(item => {
const row = `<tr>
<td>${item.candidate}</td>
<td>${item.matchScore}%</td>
</tr>`;
tbody.innerHTML += row;
});
}