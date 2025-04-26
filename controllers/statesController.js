const data = require('../models/states.json')
const State = require('../models/State');

const contigStates = ['AL','AZ','AR','CA','CO','CT','DE','FL','GA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const nonContigStates = ['AK', 'HI']

const getAllStates = async (req, res) => {
	const contig = req.query.contig;
	let states = data;

	if (contig) {
		if (contig === 'true') {
			states = data.filter(state => contigStates.includes(state.code));
		} else if (contig === 'false') {
			states = data.filter(state => nonContigStates.includes(state.code));
		} else {
			return res.status(400).json({ 'message': 'Invalid query parameter. Use "true" or "false".' });
		}
	}
	
	const stateFacts = await State.find();
	res.json(states.map(state => ({ ...state, funfacts: stateFacts.find(fact => fact.stateCode === state.code)?.funfacts })));
}

const getState = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	const stateFacts = await State.findOne({ stateCode });
	res.json({ ...state, funfacts: stateFacts.funfacts});
}

const getFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	const stateFacts = await State.findOne({ stateCode });
	if (stateFacts.funfacts.length < 1 || !stateFacts.funfacts) { 
		return res.json({ 'message': `No Fun Facts found for ${state.state}` });
	}
	const randomIndex = Math.floor(Math.random() * stateFacts.funfacts.length);
	res.json(stateFacts.funfacts[randomIndex]);
}

const addFunFacts = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const newFacts = req.body.funfacts;

	const result = await State.findOneAndUpdate(
		{ stateCode },
		{ $push: { funfacts: { $each: newFacts } } },
		{ new: true }
	)
	res.json(result)
}

const updateFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const index = req.body.index;
	const update = req.body.funfact;

	const result = await State.findOneAndUpdate(
		{ stateCode },
		{ $set: { [`funfacts.${index-1}`]: update } },
		{ new: true }
	)
	res.json(result)
}

const deleteFunFact = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const index = req.body.index;

	await State.findOneAndUpdate(
		{ stateCode },
		{ $unset: { [`funfacts.${index-1}`]: 1 } },
		{ new: true }
	)

	const result = await State.findOneAndUpdate(
		{ stateCode },
		{ $pull: { funfacts: null } },
		{ new: true }	
	)
	res.json(result)
}
	

const getCapital = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	res.json({
		'state': state.state,
		'capital': state.capital_city
	});
}

const getNickname = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	res.json({
		'state': state.state,
		'nickname': state.nickname
	});
}

const getPopulation = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	res.json({
		'state': state.state,
		'population': state.population.toLocaleString()
	});
}

const getAdmission = async (req, res) => {
	const stateCode = req.params.state.toUpperCase();
	const state = data.find(state => state.code === stateCode);
	if (!state) {
		return res.status(404).json({ 'message': 'Invalid state abbreviation parameter' });
	}
	res.json({
		'state': state.state,
		'admitted': state.admission_date
	});
}

module.exports = {
	getAllStates,
	getState,
	getFunFact,
	getCapital,
	getNickname,
	getPopulation,
	getAdmission,
	addFunFacts,
	updateFunFact,
	deleteFunFact
}