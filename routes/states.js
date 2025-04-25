const express = require('express')
const router = express.Router()
const statesController = require('../controllers/statesController')

router.route('/')
	.get(statesController.getAllStates)

router.route('/:state')
	.get(statesController.getState)
	/* .put((req, res) => {
		const employee = {
			id: parseInt(req.params.id),
			firstname: req.body.firstname,
			lastname: req.body.lastname
		}
		if (!employee.id || !employee.firstname || !employee.lastname) {
			return res.status(400).json({ 'message': 'ID and first and last names are required.' })
		}
		const index = data.employees.findIndex(emp => emp.id === employee.id)
		if (index === -1) {
			return res.status(404).json({ 'message': `Employee ID ${req.params.id} not found.` })
		}
		
		data.employees[index] = employee
		res.json(data.employees)
	})
	.delete((req, res) => {
		const id = parseInt(req.params.id)
		const index = data.employees.findIndex(emp => emp.id === id)
		if (index === -1) {
			return res.status(404).json({ 'message': `Employee ID ${req.params.id} not found.` })
		}
		data.employees.splice(index, 1)
		res.json(data.employees)
	}) */

router.route('/:state/funfact')
	.get(statesController.getFunFact)

router.route('/:state/capital')
	.get(statesController.getCapital)

router.route('/:state/nickname')
	.get(statesController.getNickname)

router.route('/:state/population')
	.get(statesController.getPopulation)

router.route('/:state/admission')
	.get(statesController.getAdmission)

module.exports = router