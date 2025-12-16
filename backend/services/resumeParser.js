const fs = require("fs");
const pdfParse = require("pdf-parse");


const SKILLS = ["java", "python", "node", "express", "mongodb", "react", "sql", "html", "css", "javascript"];


async function parseResume(filePath) {
const buffer = fs.readFileSync(filePath);
const data = await pdfParse(buffer);
const text = data.text.toLowerCase();


return {
name: "Unknown",
email: text.match(/\S+@\S+\.\S+/)?.[0] || "",
phone: text.match(/\d{10}/)?.[0] || "",
skills: SKILLS.filter(skill => text.includes(skill)).join(","),
experience: extractExperience(text),
education: text.includes("bachelor") ? "Bachelor" : "",
resumeText: text
};
}


function extractExperience(text) {
const match = text.match(/(\d+)\s+years?/);
return match ? Number(match[1]) : 0;
}


module.exports = parseResume;