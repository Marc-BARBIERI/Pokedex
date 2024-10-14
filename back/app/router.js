import { Router } from "express";
import * as pokemonController from "./controllers/pokemon.js";
import * as typeController from "./controllers/type.js";
import * as teamController from "./controllers/team.js";

export const router = Router();

// Route pour la liste des pokemons
router.get("/pokemons", pokemonController.getAllPokemons);
router.get("/pokemons/:id", pokemonController.getOnePokemon);

// Route pour la liste des types
router.get("/types", typeController.getAllTypes);
router.get("/type/:id", typeController.getOneType);

// Route pour la liste des équipes
router.get ("/teams",teamController.getAllTeams);
router.get ("/team/:id",teamController.getOneTeam);
router.post ("/team",teamController.createTeam);
router.patch ("/team/:id",teamController.updateTeam);
router.delete ("/team/:id",teamController.deleteTeam);
router.put("/team/:teamId/pokemon/:pokemonId",teamController.addPokemonOnTeam);
router.delete("/team/:teamId/pokemon/:pokemonId",teamController.removePokemonOnTeam);
