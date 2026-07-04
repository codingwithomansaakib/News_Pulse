const express = require("express");
const router = express.Router();

const clusterController = require("../controllers/clusterController");

router.get("/", clusterController.getClusters);

router.get("/sources", clusterController.getSources);

router.get("/:id", clusterController.getClusterById);

module.exports = router;