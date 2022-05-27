//import express
const express = require("express")
const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const transaksi = models.transaksi
const detail_transaksi = models.detail_transaksi
const paket = models.paket
const outlet = models.outlet
const member = models.member
const user = models.user

//import auth
// const auth = require("../auth")
// app.use(auth)

//Endpoint untuk menampilkan semua data transaksi
// app.get("/", async (req, res) =>{
//     let result = await transaksi.findAll({
//         include: [
//             // "outlet",
//             // "member",
//             // "user",
//             {
//                 model: models.detail_transaksi,
//                 as : "detail_transaksi",
//                 include: ["paket","transaksi"]
//             }
//         ]
//     })
//     res.json(result)
// })

// app.get("/", (req,res) => {
//     transaksi.findAll()
//         .then(result => {
//             res.json({
//                 transaksi : result
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: error.message
//             })
//         })
// })

app.get("/", async (req, res) =>{
    let result = await transaksi.findAll({
        include: [
            "member","outlet","user",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["paket"]
            }
        ]
    })
    res.json({
      transaksi:result,
      count : result.length
    })
})


//endpoint untuk menampilkan data transaksi berdasarkan id
app.get("/:id_member", async (req, res) =>{
    let param = { id_member: req.params.id_member}
    let result = await transaksi.findAll({
        where: param,
        include: [
            "member","outlet","user",
            {
                model: models.detail_transaksi,
                as : "detail_transaksi",
                include: ["paket"]
            }
        ]
    })
    res.json(result)
})

//endpoint untuk menambahkan data transaksi baru
app.post("/", async (req, res) =>{
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_outlet: req.body.id_outlet,
        kode_invoice: req.body.kode_invoice,
        id_member: req.body.id_member,
        tgl: current,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }
    transaksi.create(data)
        .then(result => {
            // res.json({
            //     message: "data has been inserted"
            // })
            let lastID = result.id_detail_transaksi
            detail = req.body.detail_transaksi
            detail.forEach(element => {
                element.id_detail_transaksi = lastID
            });
            detail_transaksi
            .bulkCreate(detail, { individualHooks: true})       
            .then(result => {
                res.json({
                    message: "Data has been inserted"
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// endpoint update data transaksi
app.put("/:id", async (req, res) => {
    let param = {
      id_transaksi : req.params.id
  }
  let current = new Date().toISOString().split("T")[0];
    let data = {
      id_outlet: req.body.id_outlet,
        kode_invoice: req.body.kode_invoice,
        id_member: req.body.id_member,
        tgl: current,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    };
    transaksi
      .update(data, { where: param })
      .then(async (result) => {
        await detail_transaksi.destroy({ where: param });
        let detail = req.body.detail_transaksi;
        for (let i = 0; i < detail.length; i++) {
          detail[i].id_transaksi = req.params.id;
        }
  
        // proses insert detail_transaksi
        detail_transaksi
          .bulkCreate(detail)
          .then((result) => {
            return res.json({
              message: "data has been updated",
            });
          })
          .catch((error) => {
            return res.json({
              message: error.message,
            });
          });
      })
      .catch((error) => {
        return res.json({
          message: error.message,
        });
      });
  });

//Endpoint untuk menghapus data transaksi
app.delete("/:id", (req, res) => {
    let param = {
      id_transaksi: req.params.id,
    };
  
    //delete detail transaksi
    detail_transaksi
      .destroy({ where: param })
      .then((result) => {
        // hapus data transaksi
        transaksi
          .destroy({ where: param })
          .then((hasil) => {
            return res.json({
              message: "data has been deleted",
            });
          })
          .catch((error) => {
            return res.json({
              message: error.message,
            });
          });
      })
      .catch((error) => {
        return res.json({
          message: error.message,
        });
      });
  });

module.exports = app