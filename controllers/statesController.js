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
	console.log(`number of states returned: ${states.length}`)
	const stateFacts = await State.find();
	res.json(states.map(state => ({ ...state, funfacts: stateFacts.find(fact => fact.stateCode === state.code)?.funfacts })));
}

module.exports = {
	getAllStates
}