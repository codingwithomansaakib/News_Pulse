const mongoose = require("mongoose");

const clusterSchema = new mongoose.Schema({

    clusterId: {
        type: Number,
        required: true
    },

    label: {
        type: String,
        required: true
    },

    articleCount: {
        type: Number,
        default: 0
    },

    articleIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }
    ],

    // ⭐ Added for Source Filter
    sources: [
        {
            type: String
        }
    ],

    startTime: {
        type: String
    },

    endTime: {
        type: String
    }

});

module.exports = mongoose.model("Cluster", clusterSchema);