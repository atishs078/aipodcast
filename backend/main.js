const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())

const AuthRouter = require('./router/AuthRouter')
const converterRoute = require('./router/converterRoute')



const connectDb=async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected')
    } catch (error) {
        console.log("Something went wrong while connecting database", error)
    }
}
connectDb()


app.use('/api/auth', AuthRouter)
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));
app.use('/api/podcast', converterRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
