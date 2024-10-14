import {Pokemon, Type} from "../models/index.js";

export async function getAllPokemons(req,res){
  try {
    
 const pokemons = await Pokemon.findAll({
  include:{
    model: Type,
    as: 'types',
    attributes: ['name','color'],
    through: { attributes: [] },
  }
 });
 res.json(pokemons)

} catch (error) {
    console.log ("Erreur lors de la récupération des pokemons")
  }
}

export async function getOnePokemon (req,res){
  const id = (req.params.id)
  const pokemon = await Pokemon.findByPk(id);
  res.json(pokemon)
}




