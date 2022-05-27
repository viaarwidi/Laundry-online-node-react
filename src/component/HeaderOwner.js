import React from 'react';
// import Utama from'./Component/utama';
import   Navbar  from 'react-bootstrap'
import {Link} from 'react-router-dom';

class Header extends React.Component {
    Logout = () => {
        // localStorage.removeItem("token")
        // localStorage.removeItem("admin")
        localStorage.clear()
        window.location = "../Login"
      }
  render(){
    return(
      <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
      <img
                src="http://laundryin.id/assets/images/Logo-Laundry-In-BW_r1.png"
                width="40"
                height="40"
                class="d-inline-block align-top rounded"
                alt="SMK Telkom Malang Logo">
                </img>
        <a class="navbar-brand p-2"> LaOn |</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link to="/" className="nav-link" aria-current="page">Home</Link>
            </li>
            {/* <li class="nav-item">
              <Link to="/Paket" className="nav-link">Paket</Link>
            </li> */}
          <li class="nav-item">
              <Link to="/Transaksi_Owner" className="nav-link">Transaksi</Link>
            </li>
            {/* <li class="nav-item">
              <Link to="/Cart" className="nav-link">Cart</Link>
            </li> */}
            {/* <li class="nav-item">
              <Link to="/ChooseMember" className="nav-link">ChooseMember</Link>
            </li> */}
            {/* <li class="nav-item">
              <Link to="/Login" className="nav-link">Login</Link>
             
            </li> */}
            <div>
              <li class="nav-item p-2">
                <a
                  class="btn btn-outline-light btn-sm"
                  onClick={() => this.Logout()}
                >
                  Logout
                </a>
              </li>
            </div>
            {/* <li class="nav-item">
              <Link onClick={() => this.Logout()}>Logout</Link>
             
            </li> */}
           
          </ul>
        </div>
      </div>
      
    </nav>
    </div>
    
    );
  }
}

export default Header;