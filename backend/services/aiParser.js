const OpenAI = require('openai');
const fs = require('fs');

function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required for AI features');
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

async function parseResumeWithAI(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const prompt = `Parse the following resume text and extract key information in JSON format:
    - name: Full name of the candidate
    - skills: Array of technical skills mentioned
    - experience: Number of years of experience (estimate if not specified)
    - education: Highest education level
    - summary: Brief professional summary

    Resume text:
    ${fileContent}

    Return only valid JSON.`;

    const response = await getOpenAI().chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
      temperature: 0.3,
    });

    const parsedData = JSON.parse(response.choices[0].message.content.trim());
    return {
      name: parsedData.name || 'Unknown',
      skills: Array.isArray(parsedData.skills) ? parsedData.skills.join(', ') : parsedData.skills || '',
      experience: parsedData.experience || 0,
      education: parsedData.education || '',
      summary: parsedData.summary || '',
    };
  } catch (error) {
    console.error('AI parsing error:', error);
    throw new Error('Failed to parse resume with AI');
  }
}

async function matchWithAI(candidate, job) {
  try {
    const prompt = `Rate how well this candidate matches this job on a scale of 0-1, where 1 is perfect match.

    Candidate:
    Name: ${candidate.name}
    Skills: ${candidate.skills}
    Experience: ${candidate.experience} years
    Education: ${candidate.education}
    Summary: ${candidate.summary}

    Job:
    Title: ${job.title}
    Required Skills: ${job.required_skills}
    Minimum Experience: ${job.min_experience} years

    Consider skill relevance, experience level, and overall fit. Return only a number between 0 and 1.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
      temperature: 0.2,
    });

    const score = parseFloat(response.choices[0].message.content.trim());
    return isNaN(score) ? 0 : Math.max(0, Math.min(1, score));
  } catch (error) {
    console.error('AI matching error:', error);
    return 0;
  }
}

module.exports = { parseResumeWithAI, matchWithAI };
