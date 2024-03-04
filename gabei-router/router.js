const express = require('express');
const Router = express.Router();
const Minyunim = require('../json-files/minyunim-grouped-by-cheider.json');
const myFunctions = require('../my-functions')

Router.get('/',(req,res,next)=>{
    res.render('index',{Minyunim})
});
Router.get('/view',(req,res)=>{
    res.render('view',{Minyunim, myFunctions})
})
Router.post('/add-minyan',(req,res,next)=>{
Minyunim[req.body.cheider].push(req.body)
res.redirect('/gabei')
})


module.exports = Router
