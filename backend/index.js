const express = require('express')
const app = express();
const create = require('./schema')
const cors = require('cors')
const mongoose = require('mongoose')
app.use(cors());
app.use(express.json());
express.urlencoded({ extended: true });
mongoose.connect("mongodb+srv://hgoutam2001:crud@data.gdyhcf2.mongodb.net/")
    .then(() => {
        console.log("mongodb connected");
    })
// const db = mongoose.connection.db.collection("datas")
app.post("/create", async (req, res) => {
    try {
        const newItem = new create({ fname: req.body.fname, lname: req.body.lname });
        const savedItem = await newItem.save();
        res.send("Data Added");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})
//read
app.post("/read", async (req, res) => {
    let re = mongoose.connection.db.collection("datas")
    re = await re.find({}).toArray();
    // const re = await create.find()
    res.send(re)
})
// update
app.post("/update", async (req, res) => {
    let str = req.body.existing
    let arr = str.split(" ");
    const re = await create.find({ fname: arr[0], lname: arr[1] })
    if (!str) {
        res.send("not found")
    }
    if (re !== null) {
        await create.findOneAndUpdate({ fname: req.body.fname, lname: req.body.lname })
        res.send("updated")
    }
    else {
        res.send("not found")
    }

})
// delete
app.post("/delete", async (req, res) => {
    let str = req.body.delName
    console.log("str", str);
    let arr = str.split(" ");
    const re = await create.find({ fname: arr[0], lname: arr[1] })
    console.log(re);
    if (re.length != 0) {
        await create.deleteOne({ fname: arr[0], lname: arr[1] })
            .then(() => {
                res.send("Deleted")
            })
    }
    else res.send("No data found")
})
app.listen(5000, () => {
    console.log("backend");
})

