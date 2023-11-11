const app = require('./app')
const cloudinary = require('cloudinary')
const connectDatabase = require('./db/db')

const dotenv = require('dotenv')
dotenv.config()
// connect database
connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
})
