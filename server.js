'use strict'
//require
require ('dotenv').config();
const superagent = require('superagent');
const express = require('express');
const ppg = require('pg');
const methodOverride = requie('method-override');

//main vars:
const app = express();
const PORT = process.env.PORT || 3000;
const client = new.ppg.Client(process.env.DATABASE_URL);

//uses
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

 
//routs:

app.get('/',homeHandler);
app.get('/addToJokes',addToJokesHandler)
app.get('/selectedJokes/',selectedJokesHandler);
app.get('/viewDetails/:details_Id', viewDetailsHandler)
app.put('/updataDb/:update_Id', updataDbHandler)
app.delete('/delete/:delete_id',deleteHandler)
//handlers:
function homeHandler(req,res){
let url = `https://official-joke-api.appspot.com/jokes/programming/ten`;
superagent.get(url)
.then(data=>{
    let jokeArr =data.body.map(val=>{
        return new Joke;
    })
    res.render('index',{data:jokeArr});
})

}
function Joke (res,req){
    this.type=val.type || 'no type'
    this.setup=val.setup || 'no setup'
    this.punchline=val.punchline || 'no punchline'

}

function addToJokesHandler(req,res){
    let {type,setup,punchline}=req.query;
    let sql = `INSERT INTO entrancetab (type,setup,punchline) VALUES $1, $2,$3;`;
    safeValues = [type,setup,punchline];
    client(sql,safeValues)
    .then(()=>{
    redirect('/selectedJoke')
     } )
}


function selectedJokesHandler(req,res){
let sql = `SELECT * FROM entrancetab WHERE id=$1;`;
let selected = [type,setup,punchline];
client(sql,selected)
.then(result=>{
    res.render('/page/favourite.ejs',{data:selected})
})
}

function viewDetailsHandler (req,res){
    let param=req.params.details_ID;
    let sql = `SELECT * FROM entrancetab WHERE id=details_Id;`;
    let safeValues = [param];
    client(sql,safeValues,param)
    .then(result=>{
        res.render('/pages/details.ejs', {data:safeValues})
    })

}
function updataDbHandler (req,res){
let {type,setup,punchline}=req.body;
let sql = `SET $1=type, $2=setup, $3=punchline WHERE  id =$4;`;
let safeValues = [type,setup,punchline];
client(sql,safeValues)
.then(result=>{
    res.render('/pages/details.ejs', {data:safeValues})
})
}

function deleteHandler(req,res){
    
}



function notFoundHandler (req,res){
    res.status(400).set('page not foud')
}

function errorHandler (req,res){
    res.status(500).set('error accured')
}