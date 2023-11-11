const express = require('express')
const app = express()

app.get('/', async (req, res) => {
  res.send('Hello World!')
})
app.listen(3000, () => {
  console.log('Server has started! Open http://localhost:3000')
})
