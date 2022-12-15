'use strict';

require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const books = require('./models/books');
const mongoose = require('mongoose');
// const { response } = require('express')
const app = express();

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL);
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/books', async (request, response) => {
  console.log('this is a request', request);
  try {
    let title = request.query.title;

    let result = [];
    if (title) {
      result = await books.find({
        title: title
      });
    } else {
      result = await books.find();
    }
    console.log('this is the result', result);

    response.status(200).send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/books', async (request, response) => {
  let newBook = await books.create(request.body);
  response.send(newBook);
});

app.delete('/books/:id', async (request, response) => {
  let id = request.params.id;

  let deletedBook = await books.findByIdAndDelete(id);

  response.send(deletedBook);
});

// app.use;



app.put('/books/:id', async (request, response) => {

  let id = request.params.id;
  // find a cat in the database, and update it's values
  let updatedBook = await books.findOneAndUpdate({ _id: id}, request.body);
  console.log(updatedBook);
  response.send(updatedBook);
});

app.use('*', (request, response) => {
  response.status(500).send('Invalid Request, page not found.');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));


