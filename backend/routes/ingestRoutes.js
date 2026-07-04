const express = require("express");

const router = express.Router();

const {

    triggerIngest,

    getStatus

} = require("../controllers/ingestController");

router.post("/trigger", triggerIngest);

router.get("/status/:jobId", getStatus);

module.exports = router;