const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
})
module.exports = mongoose.model("data", schema)