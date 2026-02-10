# BFHL API - Company Test Submission

## Overview
This project is a Node.js REST API developed for the Bajaj Finserv Hiring League (BFHL) company test. It provides endpoints for mathematical operations and AI-powered answers using Google Gemini API.

## Features
- Health check endpoint
- Mathematical operations: Fibonacci, Prime, LCM, HCF
- AI-powered answers (Google Gemini)

## Endpoints

### 1. Health Check
- **URL:** `/health`
- **Method:** GET
- **Response:**
  - `is_success`: true
  - `official_email`: deepanshu1645.be23@chitkara.edu.in

### 2. Mathematical Operations & AI
- **URL:** `/bfhl`
- **Method:** POST
- **Request Body:**
  - For Fibonacci: `{ "fibonacci": <number> }`
  - For Prime: `{ "prime": [<numbers>] }`
  - For LCM: `{ "lcm": [<numbers>] }`
  - For HCF: `{ "hcf": [<numbers>] }`
  - For AI: `{ "AI": <question> }`
- **Response:**
  - `is_success`: true/false
  - `official_email`: deepanshu1645.be23@chitkara.edu.in
  - `data`: result or answer

## Setup Instructions

1. Clone the repository or copy the project files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start the server:
   ```bash
   node index.js
   ```

## Example Requests

### Fibonacci
```json
POST /bfhl
{
  "fibonacci": 5
}
```

### Prime
```json
POST /bfhl
{
  "prime": [2, 3, 4, 5, 6]
}
```

### LCM
```json
POST /bfhl
{
  "lcm": [4, 6, 8]
}
```

### HCF
```json
POST /bfhl
{
  "hcf": [12, 16, 24]
}
```

### AI
```json
POST /bfhl
{
  "AI": "What is the capital city of Maharashtra?"
}
```

## Notes
- Ensure your Gemini API key is valid and has access to the generative language API.
- The official email is used for identification as per test requirements.

## Author
Deepanshu Sharma
Email: deepanshu1645.be23@chitkara.edu.in

---
For any queries, contact the author via email.
