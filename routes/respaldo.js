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
    var lide = "";
    var lname = "";
    var lmoves = "";
    var ltypes = "";

    axios
    .get("https://pokeapi.co/api/v2/pokemon/"+req.params.name)
    // Show response data
    .then((res) => 
    
    console.log(
        
        
        res.data.forms[0].name + " -- " + res.data.id + " -- " +
     res.data.types[0].type.name + " -- " + res.data.moves[0].move.name + res.data.moves[1].move.name
     + res.data.moves[2].move.name + res.data.moves[3].move.name)
     
     
     )
       
     
     
    .catch((err) => res.status(400).json({ message: "pokemon no encontrado" }) );
 
    const pokemon = new Pokemon({
        name: lname,
        id: lide ,
        moves: lmoves,
        types: ltypes 
    });

    try {
        const newPokemon = await pokemon.save();
        res.status(201).json(newPokemon);
    } catch (err) {
        res.status(400).json({ message: err.message });
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


module.exports = router;