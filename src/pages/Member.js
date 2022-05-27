import React from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import Header from '../component/Header'


export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            member: [],
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            //if (localStorage.getItem("role") === "admin"){
                //this.state.token = localStorage.getItem("token")
            //} else {
               // window.alert("Anda bukan Admin")
                //window.location = "/"
            //}
            
        } else {
            window.location = "/login"
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getMember = () => {
        let member = (localStorage.getItem("nama"))
        let url = "http://localhost:8080/member"
        axios.get(url)
            .then(res => {
                this.setState({
                    member: res.data.member,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(member)
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_member:item.id_member,
            nama: item.nama,
            alamat:item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update"
        })
    }

    Add = () => {
        this.setState({
            isModalOpen: true,
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin:"",
            tlp: "",
            action: "insert"
        });
    }

    dropMember = id_member => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = "http://localhost:8080/member/" + id_member
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMember()
                })
                .catch(error => console.log(error))
        }
    }

    handleSave = e => {
        e.preventDefault()
        let form = {
            id_member:this.state.id_member,
            nama: this.state.nama,
            alamat:this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp,
          
        }

        let url = ""
        if (this.state.action === "insert") {
            url = "http://localhost:8080/member"
            axios.post(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMember()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            url = "http://localhost:8080/member/" + this.state.id_member
            axios.put(url, form, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getMember()
                    this.handleClose()
                })
                .catch(error => console.log(error))
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMember = this.state.member
            let result = tempMember.filter(item => {
                return item.nama.toLowerCase().includes(keyword) 

            })
            this.setState({member: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMember()
    }

    render() {
        return (
            <div>
                <Header/>
                {/* <div className="back"> */}
                <div className="container">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="display-6">Member Data</span>
                    </h4>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    {/* <h3 className="text-bold text-info mt-2">Admin List</h3> */}
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr  align="center">
                                <th>NO</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Jenis Kelamin</th>
                                <th>Telepon</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody  align="center">
                            {this.state.member.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nama}</td>
                                        <td>{item.alamat}</td>
                                        <td>{item.jenis_kelamin}</td>
                                        <td>{item.tlp}</td>
                                        <td>
                                            {/* button untuk mengedit */}
                                            <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                            </button>
                                            {/* button untuk menghapus */}
                                            <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropMember(item.id_member)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Add Member
                    </button>

                    {/* modal admin  */}
                    <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Outlet</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Nama Member </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama}
                                        onChange={e => this.setState({ nama: e.target.value })} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="alamat">
                                    <Form.Label className="text-black">Alamat</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat}
                                        onChange={e => this.setState({ alamat: e.target.value })} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="jenis_kelamin">
                                    <Form.Label className="text-black">Jenis Kelamin</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="jenis_kelamin" placeholder="Masukkan Jenis Kelamin" value={this.state.jenis_kelamin}
                                        onChange={e => this.setState({ jenis_kelamin: e.target.value })} required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tlp">
                                    <Form.Label className="text-black">Telepon</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="tlp" placeholder="Masukkan No Telepon" value={this.state.tlp}
                                        onChange={e => this.setState({ tlp: e.target.value })} required
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
            </div>
        )
    }
}