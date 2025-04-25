const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
		stateCode: {
				type: String,
				required: true,
				trim: true
		},
		funfacts: {
				type: [String]
		}
});

module.exports = mongoose.model('State', stateSchema);