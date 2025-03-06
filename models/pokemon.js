const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    moves: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Pokemon', PokemonSchema);