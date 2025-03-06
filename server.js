const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pokemonRoutes = require('./routes/pokemon');

const app = express();

app.use(bodyParser.json());
app.use('/pokemons', pokemonRoutes);

const port = 3000;

mongoose.connect('mongodb+srv://ai27:123456abc@ai27db.rpscjra.mongodb.net/?retryWrites=true&w=majority&appName=ai27DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});