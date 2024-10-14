import { Pokemon } from "./Pokemon.js";
import { Teams } from "./Team.js";
import { Type } from "./Type.js";
import { sequelize } from "../database.js";



Pokemon.belongsToMany(Type,{
  through :'pokemon_type',
  as:"types",
  foreignKey:'pokemon_id',
});

Type.belongsToMany(Pokemon,{
  through:'pokemon_type',
  as:"pokemons",
  foreignKey:'type_id',
});

Pokemon.belongsToMany(Teams,{
  through:'team_pokemon',
  as:"teams",
  foreignKey: 'pokemon_id',
});

Teams.belongsToMany(Pokemon,{
  through:'team_pokemon',
  as:"pokemons",
  foreignKey: 'team_id',
});

export{Pokemon,Teams,Type,sequelize};