import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Login from "./Login"
import Paket from "./Paket"
import Member from "./Member"
import Transaksi from "./Transaksi"
import ChooseMember from "./ChooseMember"
import Home from "./Home"
import User from "./User"
import Outlet from "./Outlet"
import Cart from "./Cart"
import Cetak from "./Cetak"
import Transaksi_Owner from "./Transaksi_Owner"
import Detail_Transaksi from './Detail_Transaksi';

const Utama = () => (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/Outlet" element={<Outlet/>}/>
        <Route path="/Member" element={<Member/>}/>
        <Route path="/Paket" element={<Paket/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/ChooseMember" element={<ChooseMember/>}/> 
        <Route path="/Transaksi" element={<Transaksi/>}/>
        <Route path="/Cetak" element={<Cetak/>}/>
        <Route path="/Transaksi_Owner" element={<Transaksi_Owner/>}/>
        <Route path="/Detail_Transaksi" element={<Detail_Transaksi/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)

export default Utama;