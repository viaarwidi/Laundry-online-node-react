//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const user = model.user


//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//authorization
app.post("/auth", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await user.findOne({where: data})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", auth, (req,res) => {
    user.findAll()
        .then(result => {
            res.json({
                user : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//end point untuk ngeget berdasarkan id
app.get("/:id_user", (req, res) =>{
    user.findOne({ where: {id_user: req.params.id_user}})
    .then(result => {
        res.json({
            user: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data admin, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password:  md5(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role,
    }

    user.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data admin, METHOD: PUT, function:update
app.put("/:id_user", (req,res) => {
    let param = {
        id_user : req.params.id_user
    }
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password:  md5(req.body.password),
        id_outlet: req.body.id_outlet,
        role: req.body.role,
    }
    user.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data admin, METHOD: DELETE, function: destroy
app.delete("/:id_user", (req,res) => {
    let param = {
        id_user : req.params.id_user
    }
    user.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})


module.exports = app
