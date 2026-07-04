const Cluster = require("../models/Cluster");

exports.getTimeline = async (req, res) => {

    try {

        const clusters = await Cluster.find();

        const timeline = clusters.map(cluster => ({

            id: cluster.clusterId,

            label: cluster.label,

            start: cluster.startTime,

            end: cluster.endTime,

            size: cluster.articleCount

        }));

        res.json(timeline);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};