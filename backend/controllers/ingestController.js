const { spawn } = require("child_process");
const crypto = require("crypto");

const jobs = require("../utils/jobstore");

exports.triggerIngest = (req, res) => {

    const jobId = crypto.randomUUID();

    jobs[jobId] = "Running";

    const process = spawn("python", ["../scraper/main.py"]);

    process.on("close", () => {

        jobs[jobId] = "Completed";

    });

    res.json({
        jobId
    });

};

exports.getStatus = (req, res) => {

    res.json({

        status: jobs[req.params.jobId] || "Unknown"

    });

};