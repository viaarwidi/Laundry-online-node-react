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
const member = model.member

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"



//endpoint menampilkan semua data member, method: GET, function: findAll()
app.get("/", (req,res) => {
    member.findAll()
        .then(result => {
            res.json({
                member : result,
                count : result.length
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//end point untuk ngeget berdasarkan id
app.get("/:id_member", (req, res) =>{
    member.findOne({ where: {id_member: req.params.id_member}})
    .then(result => {
        res.json({
            member: result
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
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp,
    }
    member.create(data)
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
app.put("/:id_member", (req,res) => {
    let param = {
        id_member : req.params.id_member
    }
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp,
    }
    member.update(data, {where: param})
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
app.delete("/:id_member", (req,res) => {
    let param = {
        id_member : req.params.id_member
    }
    member.destroy({where: param})
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
