const express = require('express')
const mongoose = require('mongoose')
const db = require('./config/connection');

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(require('./routes'))
//Discovered i can wrap my db.once function around this mongoose.set 
// mongoose.set('debug', true)

db.once('open', () => {
    // // Use this to log mongo queries being executed!
    mongoose.set('debug', true)
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  