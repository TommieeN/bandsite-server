const express = require("express")
const app = express()

const commentData = require("./routes/commentsRoute.js")
const showsData = require("./routes/showsRoute.js")
const cors = require("cors")

const PORT = 8081

app.use(cors())

app.use(express.json())

app.use("/", showsData)
app.use("/", commentData)


app.listen(PORT, () => {
    console.log(`App is Running on Port ${PORT}`)
})
