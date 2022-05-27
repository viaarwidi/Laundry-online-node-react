import React, {Component} from "react";
import axios from "axios";
import { Modal, Form, Button } from "react-bootstrap";
import Header from '../component/Header'

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
        }
        if(localStorage.getItem("token")){
            this.state.token = localStorage.getItem("token")
            this.state.id_outlet = localStorage.getItem("outlet")
            this.state.id_member = localStorage.getItem("id_member")
            this.state.id_user = localStorage.getItem("id_user")
            this.state.role = localStorage.getItem('role')
            }else{
            window.location = "/login"
            }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    
    render(){
        return (
        <>
            <Header/>
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Laundry</h4>
                    </div>
                    <div className="card-body">
                       
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Paket</th>
                                    <th>Jenis</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.cart.map( (item, index) =>
                                (
                                    <tr key={index}>
                                        <td>{item.nama_paket}</td>
                                        <td>{item.jenis}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>{item.qty}</td>
                                        <td>
                                        Rp { item.harga * item.qty }
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                        <td>
                        <button className="btn btn-sm btn-success btn-block m-1" onClick={() => this.checkOut()} disabled={this.state.cart.length ===0}>
                                    Checkout
                        </button>
                        </td>
                    </div>
                </div>
            </div>
            </>
        );
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("user")
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.qty)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }
    checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            // customer_id: this.state.customerID,
            // detail_transaksi: tempCart

            id_outlet: this.state.id_outlet,
            id_member: this.state.id_member,
            biaya_tambahan: this.state.total *(8/100) - this.state.total *(4/100),
            diskon: this.state.total *(4/100),
            pajak: this.state.total *(8/100),
            status: "baru",
            dibayar: "belum_bayar",
            id_user: this.state.id_user,
            detail_transaksi: tempCart,
            total: this.state.total + this.state.total *(8/100) - this.state.total *(4/100)
        }
        let url = "http://localhost:8080/transaksi"
        axios.post(url, data, this.headerConfig())
            .then(res => {
                // clear cart
                window.alert(res.data.message)
                localStorage.removeItem("cart")
                window.location = "/Transaksi"
            })
            .catch(error => {
                if (error.res) {
                    if (error.res.status) {
                        window.alert(error.res.data.message)
                        this.props.history.push
                        ("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount(){
        this.initCart()
    }
}
export default Cart;