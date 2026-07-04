const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({

    title: String,

    summary: String,

    content: String,

    source: String,

    link: String,

    published: String,

    clusterId: Number

});

module.exports = mongoose.model("Article", articleSchema);