const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/noderest', { useMongoClient: true });
console.log('[mktp] conectando banco de dados');

mongoose.connect(
    'mongodb://localhost/user'
); // Tem documents dentro deste banco de dados

mongoose.Promise = global.Promise;

module.exports = mongoose;