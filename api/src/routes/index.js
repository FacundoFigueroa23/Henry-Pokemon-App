const { Router } = require('express');

const GetPokemonsRouter = require('./getPokemons');
const GetPokemonRouter = require('./getPokemon');
const GetTypesRouter = require('./getTypes');
const PostPokemonRouter = require('./postPokemon');

const router = Router();

router.use('/', GetPokemonsRouter);
router.use('/', GetPokemonRouter);
router.use('/', GetTypesRouter);
router.use('/', PostPokemonRouter);

module.exports = router;