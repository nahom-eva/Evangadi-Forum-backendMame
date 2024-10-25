const express = require("express");
const axios = require("axios"); // Add axios to the require statements
const { testConnection } = require("./db/dbConfig"); // Import testConnection
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

// user routes middleware
const userRoutes = require("./routes/userRoute");
const questionsRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

// authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

app.use("/api/user", userRoutes);
app.use("/api/questions", authMiddleware, questionsRoute);
app.use("/api/answer", authMiddleware, answerRoute);

async function start() {
  try {
    // Test the database connection
    const result = await testConnection();
    console.log("Database connected successfully:", result);

    // Fetch and log the Render server's public IP address
    const ipResponse = await axios.get("https://api64.ipify.org?format=json");
    console.log("Render Server IP Address:", ipResponse.data.ip);

    const PORT = process.env.PORT || 3000;  
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${server.address().port}`);
    });

    // Handle server-level errors
    server.on("error", (error) => {
      console.error("Server error:", error.message);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
  }
}

start();
