require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const EMAIL = process.env.OFFICIAL_EMAIL;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ---------------- HEALTH ----------------
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// ---------------- HELPERS ----------------
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// ---------------- BFHL API ----------------
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    let data;

    if (body.fibonacci !== undefined) {
      data = fibonacci(body.fibonacci);
    }
    else if (body.prime !== undefined) {
      data = body.prime.filter(isPrime);
    }
    else if (body.lcm !== undefined) {
      data = body.lcm.reduce((a, b) => lcm(a, b));
    }
    else if (body.hcf !== undefined) {
      data = body.hcf.reduce((a, b) => gcd(a, b));
    }
    else if (body.AI !== undefined) {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });
      const prompt = `Answer in a single word only. No punctuation. Question: ${body.AI}`;
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 10, temperature: 0.2 }
      });
      data = result.response.text().trim();
    }
    else {
      return res.status(400).json({
        is_success: false,
        message: "Invalid request body"
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
