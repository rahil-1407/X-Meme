const express = require('express')
const app = express()
const http = require('http').createServer(app)
const routes = require('./routes');
const path = require('path');

const PORT = process.env.PORT || 8081

//Middleware to load static files as CSS files or images
app.use(express.static(__dirname + '/Frontend/public'))

//Setting up the view engine as EJS
app.set('view engine', 'ejs')

//Routes to handle client requests
app.get('/',routes);
app.post('/',routes);

app.get('/memes/:id',routes);
app.post('/memes',routes);
app.get('/memes',routes);

//Server made to listen on a port
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})