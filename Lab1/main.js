
const express = require('express');
const app = express ()
const path = require('path');

// var cons = require('consolidate');

// view engine setup
// app.engine('html', cons.swig)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.set('view engine', 'html');
app.set("views", path.join(__dirname, 'views'))

app.get('/', (req, res) =>{
    res.render('home')})
app.get('/contact', (req, res) =>{
    res.send('Contact page');
})

app.get('/about', (req, res) =>{
    res.send('About page');
})


app.listen(8090)