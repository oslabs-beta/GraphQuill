// const path = require('path');
// const express = require('express');
// require('dotenv').config();

// eslint-disable-next-line prefer-destructuring
// const PORT = 3000;

// const app = express();
// const queryController = require('./controllers/queryController.js');

// app.use(bodyParser.json());

// app.use('/', (req, res) => {
//   console.log('hello, friend');
//   res.send('hello, friend');
// });

// // serve static content
// app.get('/', (req, res) => {
//   res.set('Content-Type', 'text/html').status(200).sendFile
// (path.resolve(__dirname, '../client/index.html'), (err) => {
//     res.status(404).end('something went wrong');
//   });
// });

// app.listen(PORT, () => console.log('fuck you'));
// function graphQuill() {}
// graphQuill(`
//   {
//     customer(id: 4) {
//       id
//       name
//       address
//     }
//   }
// `,);
