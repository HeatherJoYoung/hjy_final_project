const data = require('../models/states.json')

const getAllStates = (req, res) => {
	res.json(data)
}

module.exports = {
	getAllStates
}