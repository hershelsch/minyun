const express = require('express');
const app = express();
const path = require('path');
const Minyunim = require('./json-files/minyunim-grouped-by-cheider.json')
const gabeiRouter = require('./gabei-router/router')
const PORT = 8000;
app.set('view engine','ejs')
app.use(express.urlencoded())
app.use(express.json())
let publicPath = path.join(__dirname,'website');
app.use('/wall',express.static(publicPath));
app.use('/css',express.static('css'))
app.use('/javascript',express.static('javascript'))
app.get('/minyunim-json',(req,res,next)=>{
res.json(Minyunim)
});

app.use('/gabei',gabeiRouter)
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})