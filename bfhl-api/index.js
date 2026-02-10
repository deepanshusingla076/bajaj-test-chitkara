const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "deepanshu1645.be23@chitkara.edu.in";

// GET /health
app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});

// Helper Functions 
function fibonacci(n) {
  let arr = [0, 1];
  for (let i = 2; i < n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr.slice(0, n);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
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

// POST /bfhl 
app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;
    const key = Object.keys(body)[0];
    let data;

    if (key === "fibonacci") {
      data = fibonacci(body.fibonacci);
    } 
    else if (key === "prime") {
      data = body.prime.filter(isPrime);
    } 
    else if (key === "lcm") {
      data = body.lcm.reduce((a, b) => lcm(a, b));
    } 
    else if (key === "hcf") {
      data = body.hcf.reduce((a, b) => gcd(a, b));
    } 
    else if (key === "AI") {
      const aiRes = await axios.post(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: body.AI }]
            }
          ]
        }
      );
      data = aiRes.data.candidates[0].content.parts[0].text.split(" ")[0];
    } 
    else {
      return res.status(400).json({
        is_success: false,
        message: "Invalid key"
      });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

// START SERVER 
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
