const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function parseResumeWithAI(content) {
  try {
    const prompt = `Extract the following information from the resume text below:
- Name
- Skills (as a comma-separated list)
- Experience (in years)
- Education

Resume text:
${content}

Provide the output in JSON format.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
    });

    const extracted = response.choices[0].message.content.trim();
    return JSON.parse(extracted);
  } catch (error) {
    throw new Error('AI parsing failed: ' + error.message);
  }
}

async function matchWithAI(candidate, job) {
  try {
    const prompt = `Rate how well the following candidate matches the job on a scale of 0 to 1 (where 1 is perfect match). Consider skills, experience, and overall fit.

Candidate:
- Name: ${candidate.name}
- Skills: ${candidate.skills}
- Experience: ${candidate.experience} years
- Education: ${candidate.education}

Job:
- Title: ${job.title}
- Description: ${job.description}
- Required Skills: ${job.required_skills}
- Location: ${job.location}

Provide only a number between 0 and 1.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
    });

    const score = parseFloat(response.choices[0].message.content.trim());
    return isNaN(score) ? 0 : score;
  } catch (error) {
    console.error('AI matching failed:', error.message);
    return 0;
  }
}

module.exports = {
  parseResumeWithAI,
  matchWithAI,
};
