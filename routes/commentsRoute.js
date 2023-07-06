const express = require("express")
const fs = require("fs")
const { v4: uuid } = require("uuid");
const router = express.Router()
// const { readAndParseData } = require("../util/index.js")

router.use(express.json())

const readAndParseData = () => {
    const data = fs.readFileSync("./data/comments.json", "utf-8");
  return JSON.parse(data); 
}

// ROUTE TO GET COMMENTS DATA
router.route("/comments").get((req, res) => {
    try {
        const commentData = readAndParseData().map((comment) => {
            return {
                name: comment.name,
                comment: comment.comment,
                id: comment.id,
                likes: comment.likes,
                timestamp: comment.timestamp
            }
        })
        res.json(commentData)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

// ROUTE TO POST COMMENTS
router.route("/comments").post((req, res) => {
    try {
        const { name, comment } = req.body
        const commentData = readAndParseData()
        const newComment = {
            comment,
            id: uuid(),
            likes: 0,
            name,
            timestamp: Date.now(),
        };
        commentData.push(newComment)
        fs.writeFileSync("./data/comments.json", JSON.stringify(commentData))
        res.json(commentData)
    } catch (error) {
        res.status(500).send("Server error")
    }
})

module.exports = router;