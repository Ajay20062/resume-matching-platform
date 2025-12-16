function matchCandidate(candidate, job) {
const cSkills = candidate.skills.split(",");
const jSkills = job.skills.split(",");


const matched = cSkills.filter(s => jSkills.includes(s));
const skillScore = (matched.length / jSkills.length) * 70;
const expScore = candidate.experience >= job.minExperience ? 30 : 10;


return Math.round(skillScore + expScore);
}


module.exports = matchCandidate;