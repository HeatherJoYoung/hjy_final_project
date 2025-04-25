const data = require('../models/states.json')
const State = require('../models/State');

/* const getAllStates = async (req, res) => {
	const states = await State.find();
	if (!states) {
		return res.status(204).json({ 'message': 'No states found.' });
	}
	res.json(states.map(state => {
		return {
			code: state.stateCode,
			funfacts: state.funfacts
		}
	}));
} */

const getAllStates = async (req, res) => {
	const stateFacts = await State.find();
	res.json(data.map(state => ({ ...state, funfacts: stateFacts.find(fact => fact.stateCode === state.code)?.funfacts })));
}

module.exports = {
	getAllStates
}