const express = require('express');
const axios = require("axios");
const router = express.Router();
const Pokemon = require('../models/pokemon.js');

// Get all pokemons
router.get('/', async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json(pokemons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a pokemon
router.post('/:name', async (req, res) => {
   const respons = await axios
    .get("https://pokeapi.co/api/v2/pokemon/"+req.params.name.toLowerCase())
    // Show response data
    .catch((err) => 
    res.json({ message:  "pokemon no encontrado" })  
    );
  if(respons.data){
    if(respons.data.moves[2] && respons.data.moves[3] && respons.data.moves[1]){
    const pokemon = new Pokemon({
        name: respons.data.forms[0].name,
        id: respons.data.id ,
        moves:  respons.data.moves[0].move.name + respons.data.moves[1].move.name
        + respons.data.moves[2].move.name + respons.data.moves[3].move.name,
        types: respons.data.types[0].type.name 
    });
    try {
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    }else{
      const  pokemon = new Pokemon({
            name: respons.data.forms[0].name,
            id: respons.data.id ,
            moves:  respons.data.moves[0].move.name,
            types: respons.data.types[0].type.name 
        });
        try {
            const newPokemon = await pokemon.save();
            res.status(201).json(newPokemon);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}
});


// delete a pokemon
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const pokemon = await Pokemon.findByIdAndDelete(_id);
        if (!pokemon) return res.sendStatus(404);
        res.status(201).json({ message: "pokemon deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// delete all pokemons
router.put('/:type', async (req, res) => {
    try {
        const query = { types: { $regex: req.params.type.toLowerCase() } };
        const pokemon = await Pokemon.deleteMany(query);
        if (!pokemon) return res.sendStatus(404);
        res.status(201).json({ message: "all pokemons of type: "+ req.params.type.toLowerCase() +" deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;