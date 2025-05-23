require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500
// connect to MongoDB
connectDB()

app.use(cors(corsOptions)) 

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json data
app.use(express.json())

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/root'))
app.use('/states', require('./routes/states'))

app.all('*etc', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({ error: '404 Not Found' })
	} else {
		res.type('txt').send('404 Not Found')
	}
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})