const express = require("express")
const fs = require("fs")

const router = express.Router()

router.use(express.json())

const readAndParseData = () => {
    const data = fs.readFileSync("./data/comments.json", "utf-8");
  return JSON.parse(data); 
}

router.route("/").get((req, res) => {
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

module.exports = router;