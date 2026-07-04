const Cluster = require("../models/Cluster");
const Article = require("../models/Article");

// ==========================
// GET ALL CLUSTERS
// ==========================
exports.getClusters = async (req, res) => {
    try {

        const clusters = await Cluster.find().sort({
            clusterId: 1
        });

        res.json(clusters);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }
};


// ==========================
// GET CLUSTER DETAILS
// ==========================
exports.getClusterById = async (req, res) => {

    try {

        const clusterId = Number(req.params.id);

        const cluster = await Cluster.findOne({
            clusterId: clusterId
        });

        if (!cluster) {

            return res.status(404).json({
                message: "Cluster not found"
            });

        }

        // Fetch all articles belonging to this cluster
        const articles = await Article.find({
            clusterId: cluster.clusterId
        });

        res.json({
            cluster,
            articles
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};


// ==========================
// GET ALL NEWS SOURCES
// ==========================
exports.getSources = async (req, res) => {

    try {

        const sources = await Article.distinct("source");

        sources.sort();

        res.json(sources);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

};