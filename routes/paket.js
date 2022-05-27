//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const model = require('../models/index');
const paket = model.paket

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//config storage image
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"./image")
    },
    filename: (req,file,cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})

//endpoint menampilkan semua data admin, method: GET, function: findAll()
app.get("/", (req,res) => {
    paket.findAll()
        .then(result => {
            res.json({
                paket : result,
                count: result.length
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//end point untuk ngeget berdasarkan id
app.get("/:id_paket", (req, res) =>{
    paket.findOne({ where: {id_paket: req.params.id_paket}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data admin, METHOD: POST, function: create
app.post("/", upload.single("image"), (req,res) => {
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    }else{let data = {
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga,
        image: req.file.filename
    }

    paket.create(data)
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
    }
})

//endpoint mengupdate data admin, METHOD: PUT, function:update
app.put("/:id_paket", upload.single("image"),  (req,res) => {
    let param = {
        id_paket : req.params.id_paket
    }
    let data = {
        id_outlet: req.body.id_outlet,
        jenis: req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga,
        image: req.file.filename
    }
    if (req.file) {
        // get data by id
        const row = paket.findOne({where: param})
        .then(result => {
            let oldFileName = result.image
           
            // delete old file
            let dir = path.join(__dirname,"../image",oldFileName)
            fs.unlink(dir, err => console.log(err))
        })
        .catch(error => {
            console.log(error.message);
        })

        // set new filename
        data.image = req.file.filename
    }

    paket.update(data, {where: param})
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
app.delete("/:id_paket", (req,res) => {
    let param = {
        id_paket : req.params.id_paket
    }
    paket.destroy({where: param})
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
