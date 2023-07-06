const express = require("express")
const fs = require("fs")
const router = express.Router()
// const { readAndParseData } = require("../util/index.js")

router.use(express.json())

const readAndParseData = () => {
    const data = fs.readFileSync("./data/showDates.json", "utf-8");
  return JSON.parse(data); 
}

// ROUTE TO GET SHOWS DATA
router.route("/shows").get((req, res) => {
    try {
        const showsData = readAndParseData().map((show) => {
            return {
                id: show.id,
                date: show.date,
                place: show.place,
                location: show.location,
            }
        })
        res.json(showsData)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

module.exports = router;