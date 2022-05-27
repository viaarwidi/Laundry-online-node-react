
import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import Header from '../component/Header'
import PaketList from "../component/PaketList";

export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            paket: [],
            outlet: [],
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: "",
            image: null,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem('role')
            // if (localStorage.getItem("role") === "admin"){
                // this.state.token = localStorage.getItem("token")
                // this.state.role = localStorage.getItem('role')
            // } else {
            //     window.alert("Anda bukan Admin")
            //     window.location = "/"
            // }
            
        } else {
            window.location = "/login"
        }

    }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0] //up 1 file saja
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getPaket = () => {
        let paket = (localStorage.getItem("nama_paket"))
        let url = "http://localhost:8080/paket"
        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    paket: res.data.paket,
                })

            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(paket)
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"
        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    outlet: res.data.outlet,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    addPaket = () => {
        this.setState({
            isModalOpen: true,
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: "",
            image: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_paket: item.id_paket,
            id_outlet: item.id_outlet,
            jenis: item.jenis,
            nama_paket: item.nama_paket,
            harga: item.harga,
            image: item.image,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  new FormData()//
        form.append("id_outlet",this.state.id_outlet)
        form.append("jenis",this.state.jenis)
        form.append("nama_paket",this.state.nama_paket)
        form.append("harga",this.state.harga)
        form.append("image",this.state.image)
       
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/paket"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
            }else if (this.state.action === "update") {
            url = "http://localhost:8080/paket/" + this.state.id_paket
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getPaket()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    handleDel = (id_paket) => {
        let url = "http://localhost:8080/paket/" + id_paket
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getPaket()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempPaket = this.state.paket
            let result = tempPaket.filter(item => {
                return item.nama_paket.toLowerCase().includes(keyword) 

            })
            this.setState({paket: result})
        }
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
    
        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
    
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
    
        if(existItem){
            // jika item yang dipilih ada pada keranjang belanja
            window.alert("Anda telah memilih item ini")
        }else{
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan jumlah item yg dibeli
    
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
    
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }
    handleChoose = (selectedItem) =>{
        if(localStorage.getItem("id_member") !== null){
          let tempCart = []
    
          if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
          }
    
           // cek data yang dipilih user ke keranjang belanja
           let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
           if (existItem) {
               // jika item yang dipilih ada pada keranjang belanja
               window.alert(`You have choose ${selectedItem.nama_paket} package`)
           }
           else {
             window.location="/Cart"
               // user diminta memasukkan jumlah item yang dibeli
               let promptJumlah = window.prompt(`Input qty ${selectedItem.nama_paket} `, "")
               if (promptJumlah !== null && promptJumlah !== "") {
                   // jika user memasukkan jumlah item yang dibeli
                   // menambahkan properti "jumlahBeli" pada item yang dipilih
                   selectedItem.qty = promptJumlah
                   // masukkan item yang dipilih ke dalam cart
                   tempCart.push(selectedItem)
                   // simpan array tempCart ke localStorage
                   localStorage.setItem("cart", JSON.stringify(tempCart))
               }
           }
        }else{
          window.location = '/choosemember'
        }
      }
    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getPaket()
        this.getOutlet()
    }

    render() {
        return (
            <div>
                <Header/>
                 {/* {this.state.role == "admin" &&
                            <Header />
                            //<HeaderAdmin/>
                        }
                {this.state.role == "kasir" &&
                            <Header />
                            //<HeaderKasir/>
                        }
                {this.state.role == "owner" &&
                    <Header />
                    //<HeaderOwner/>
                } */}
                <div className="container">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="display-6">Outlet Data</span>
                    </h4>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    <div className="back">
                <div className="container">
                    <div className="row">
                        {this.state.paket.map((item, index) => {
                            return (
                                <PaketList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/" + item.image}//nama file link dari url
                                    jenis={item.jenis}
                                    id_outlet={item.id_outlet}
                                    nama_paket={item.nama_paket}
                                    harga={item.harga}
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.id_paket)}
                                   
                                    onCart={() => this.addToCart(item)}
                                />
                            )
                        })}
                    </div>
                    <button className="btn btn-dark" onClick={() => this.addPaket()}>
                    Add Paket
                    </button><br />

                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Paket</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-2">
                                    <Form.Label> Outlet </Form.Label>
                                    <Form.Select id="mySelect" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} required>
                                    <option className="opsitransacd ksi" value="" readOnly={true} hidden={true}>
                                        Pilih outlet
                                    </option>
                                    {this.state.outlet.map((outlet) => (
                                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama_paket">
                                    <Form.Label className="text-black" >Nama Paket </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama_paket" placeholder="Masukkan Nama Paket" value={this.state.nama_paket} onChange={this.handleChange} />
                                </Form.Group>
                                {/* <Form.Group className="mb-3" controlId="jenis">
                                    <Form.Label className="text-black">Jenis</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="jenis" placeholder="Masukkan Jenis" value={this.state.jenis} onChange={this.handleChange} />
                                </Form.Group> */}
                                <Form.Group  className="mb-3">
                                <Form.Label className="text-black" >Jenis Paket</Form.Label>
                                <Form.Select id="mySelect"name="jenis" value={this.state.jenis} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Jenis Paket
                                    </option>
                                    <option value="kiloan">Kiloan</option>
                                    <option value="selimut">Selimut</option>
                                    <option value="bed_cover">Bed Cover</option>
                                    <option value="kaos">Kaos</option>
                                    <option value="kain">Kain</option>
                                </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="harga">
                                    <Form.Label className="text-black">Harga</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="harga" placeholder="Masukkan Harga" value={this.state.harga} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="text-black">Image </Form.Label>
                                    {/* image tidak peru value */}
                                    <Form.Control className="text-dark bg-transparent" type="file" name="image" placeholder="Masukkan Foto Customer" value={this.state.Image} onChange={this.handleFile}  />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                               
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
                </div>
                </div>
                </div>
        )
    }

}

