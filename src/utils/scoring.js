// Very simple scoring function: skill matches, experience, assessment
exports.calculateScore = ({ candidate, jobKeywords = [], assessmentScore = null }) => {
  let score = 0;

  // skill matching: each keyword match gives 10 points
  const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase());
  const matches = jobKeywords.reduce((acc, kw) => {
    if (candidateSkills.includes(kw.toLowerCase())) return acc + 1;
    return acc;
  }, 0);
  score += matches * 10;

  // experience weight: each year gives 2 points, cap at 20
  score += Math.min(20, (candidate.experienceYears || 0) * 2);

  // assessment score (if given) scaled to 50
  if (assessmentScore !== null) {
    score += Math.min(50, (assessmentScore / 100) * 50);
  }

  // normalize to 0-100
  const normalized = Math.min(100, Math.round(score));
  return normalized;
};
