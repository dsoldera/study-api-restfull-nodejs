const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// app.use('/', (req, res) => {
//     res.send('Running...');
// });

// passar para o controller o app
require('./controllers/authController')(app); 

app.listen(3000);