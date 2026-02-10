const apiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GOOGLE_API_KEY_FALLBACK_1,
  process.env.GOOGLE_API_KEY_FALLBACK_2,
  process.env.GOOGLE_API_KEY_FALLBACK_3
].filter(Boolean);

module.exports = { apiKeys };
