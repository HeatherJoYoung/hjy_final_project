const data = require('../models/states.json')
const State = require('../models/State');

const getAllStates = async (req, res) => {
	const states = await State.find();
	if (!states) {
		return res.status(204).json({ 'message': 'No states found.' });
	}
	res.json(states.map(state => {
		return {
			id: state.id,
			facts: state.facts
		}
	}));
}

/* const getAllStates = (req, res) => {
	console.log(`Number of states in provided json: ${data.length}`)
	res.json(data.map(state => {
		return {
			id: state.code,
			facts: []
		}
	}))
} */

module.exports = {
	getAllStates
}