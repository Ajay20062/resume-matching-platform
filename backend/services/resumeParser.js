const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function parseResume(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    let content = '';

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      content = data.text;
    } else if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      content = result.value;
    } else {
      // Assume plain text for other formats
      content = fs.readFileSync(filePath, 'utf8');
    }

    // Basic parsing logic - extract name, skills, experience
    const lines = content.split('\n');

    let name = '';
    let skills = [];
    let experience = 0;

    // Simple extraction logic
    for (const line of lines) {
      if (line.toLowerCase().includes('name') || line.toLowerCase().includes('full name')) {
        name = line.split(':')[1]?.trim() || '';
      }
      if (line.toLowerCase().includes('skills')) {
        skills = line.split(':')[1]?.split(',').map(s => s.trim()) || [];
      }
      if (line.toLowerCase().includes('experience')) {
        const expMatch = line.match(/(\d+)/);
        experience = expMatch ? parseInt(expMatch[1]) : 0;
      }
    }

    // If no structured data found, use first line as name
    if (!name && lines.length > 0) {
      name = lines[0].trim();
    }

    return {
      name: name || 'Unknown',
      skills: skills.length > 0 ? skills : ['General'],
      experience: experience || 0
    };
  } catch (error) {
    throw new Error('Failed to parse resume: ' + error.message);
  }
}

module.exports = parseResume;
