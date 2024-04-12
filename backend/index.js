// importing required modules
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { main } = require("./db/db");
const userRouter = require("./routes/userRoutes");
const orgRouter = require("./routes/orgRoutes");
const institutionRouter = require("./routes/institutionRoutes");
const eventRouter = require("./routes/eventRoutes");
const helpRouter = require("./routes/helpRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const donationRouter = require("./routes/donationRoutes");
const npoRouter = require("./routes/npoRoutes");

//using dotenv for env. variables
require("dotenv").config();

// Make incoming data in JSON format
app.use(express.json());

// Use CORS middleware
app.use(cors());

main()
  .then(() => {
    console.log("Connection Successful with Database 📊!");
  })
  .catch((err) => {
    console.log(err);
  });

// Define a basic route
app.get("/", (req, res) => {
  res.send("Home Page!");
});

app.use("/users", userRouter);
app.use("/orgs", orgRouter);
app.use("/institutions", institutionRouter);
app.use("/events", eventRouter);
app.use("/helps", helpRouter);
app.use("/payments", paymentRouter);
app.use("/category", categoryRouter);
app.use("/donations", donationRouter);
app.use("/npos",npoRouter)

// Listening the server!
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Connected to server ${PORT} 🚀!`);
});
