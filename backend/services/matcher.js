const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// Function to calculate match score between candidate and job
function matchCandidate(candidate, job) {
  if (!candidate.skills || !job.required_skills) return 0;

  const candidateSkills = tokenizer.tokenize(candidate.skills.toLowerCase()).map(word => stemmer.stem(word));
  const jobSkills = tokenizer.tokenize(job.required_skills.toLowerCase()).map(word => stemmer.stem(word));

  const intersection = candidateSkills.filter(skill => jobSkills.includes(skill));
  const union = new Set([...candidateSkills, ...jobSkills]);

  const jaccardSimilarity = intersection.length / union.size;

  // Bonus for experience
  let experienceBonus = 0;
  if (candidate.experience && job.min_experience) {
    if (candidate.experience >= job.min_experience) {
      experienceBonus = 0.2;
    }
  }

  return jaccardSimilarity + experienceBonus;
}

module.exports = matchCandidate;
