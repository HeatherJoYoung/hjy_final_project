const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
		id: {
				type: String,
				required: true,
				trim: true
		},
		facts: {
				type: [String]
		}
});

module.exports = mongoose.model('State', stateSchema);