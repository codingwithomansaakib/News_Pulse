const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/database");

const clusterRoutes = require("./routes/clusterRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const ingestRoutes = require("./routes/ingestRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clusters", clusterRoutes);
app.use("/timeline", timelineRoutes);
app.use("/ingest", ingestRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});