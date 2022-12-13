'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const Books = require('./models/books.js');
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);

Books.create({
  title: 'The Alchemist',

  description: "The Alchemist by Paulo Coelho continues to change the lives of its readers forever. With more than two million copies sold around the world, The Alchemist has established itself as a modern classic, universally admired.Paulo Coelho's masterpiece tells the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found. The story of the treasures Santiago finds along the way teaches us, as only a few stories can, about the essential wisdom of listening to our hearts, learning to read the omens strewn along life's path, and, above all, following our dreams. ",
  
  status: "Fiction"
})
.then(result => {
  console.log('Heres our book!', result);
})
.catch(err => {
  console.log('oh no, ', err);
});