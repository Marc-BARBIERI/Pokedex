import { Pokemon, Teams } from "../models/index.js";

export async function getAllTeams(req, res) {
	try {
		const teams = await Teams.findAll();
		res.json(teams);
	} catch (error) {
		console.log("Erreur lors de la récupération de la Team");
	}
}

export async function getOneTeam(req, res) {
	try {
		const id = Number(req.params.id);
		const team = await Teams.findByPk(id);
		res.json(team);
	} catch (error) {
		console.log("Erreur lors de la récupération de la Team");
	}
}

export async function createTeam(req, res) {
	try {
		const { name, description } = req.body;
		const team = new Teams({ name: name, description: description });
		await team.save();
		res.json(team);
	} catch (error) {
		console.log("Erreur lors de la création de la team:");
	}
}

export async function updateTeam(req, res) {
	try {
		const teamId = Number(req.params.id);
		const { name, description } = req.body;
		const team = await Teams.findByPk(teamId);
		team.name = name;
		team.description = description;

		await team.save();

		res.json(team);
	} catch (error) {}
}

export async function deleteTeam(req, res) {
	try {
		const teamId = Number(req.params.id);
		const team = await Teams.findByPk(teamId);
		await team.destroy();

		res.status(204).end();
	} catch (error) {
		console.error("Erreur lors de la suppression des tâches:");
	}
}

export async function addPokemonOnTeam(req, res) {
	const teamId = Number(req.params.teamId);
	const pokemonId = Number(req.params.pokemonId);

	const team = await Teams.findByPk(teamId);
	const pokemon = await Pokemon.findByPk(pokemonId);

	await team.addPokemon(pokemon);

	const updatedTeam = await Teams.findByPk(teamId, { include: Pokemon });
	res.json(updatedTeam);
}

export async function removePokemonOnTeam(req, res) {
	const teamId = Number(req.params.teamId);
	const pokemonId = Number(req.params.pokemonId);

	const team = await Teams.findByPk(teamId);
	const pokemon = await Pokemon.findByPk(pokemonId);

	await team.removePokemon(pokemon);
	const updatedTeam = await Teams.findByPk(teamId, { include: Pokemon });
	res.json(updatedTeam);
}
