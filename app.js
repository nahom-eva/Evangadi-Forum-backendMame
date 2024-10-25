const express = require("express");
const axios = require("axios"); // Add axios to the require statements
const app = express();
const cors = require("cors");
app.use(cors());

// db connection
const dbConnection = require("./db/dbConfig");

// user routes middleware
const userRoutes = require("./routes/userRoute");
const questionsRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

// authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

app.use(express.json());

// user routes
app.use("/api/user", userRoutes);

// questions routes
app.use("/api/questions", authMiddleware, questionsRoute);

// answers routes
app.use("/api/answer", authMiddleware, answerRoute);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'Test'");
    console.log(result);

    // Fetch and log the Render server's public IP address
    const ipResponse = await axios.get("https://api64.ipify.org?format=json");
    console.log("Render Server IP Address:", ipResponse.data.ip);

    // Use dynamic port selection (if 5555 is busy, another free port will be used)
    const PORT = process.env.PORT || 0;  
    const server = app.listen(PORT, () => {
      console.log("Database connection established");
      console.log(`Listening on ${server.address().port}`);
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
