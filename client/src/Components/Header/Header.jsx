import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "./Header.css";

class Header extends Component {
    render() {
      // if (typeof window.ethereum !== 'undefined') {
      //   console.log('MetaMask is installed!');
      // }
      return (
        <div id='head'>
          <div className='nav justify-content-left'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                  <Link className='navbar-brand' to='/'><img height={75} width={135} src={'../img/yeeth.png'}></img></Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to='/portfolio'>Portfolios</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                      {/* <div id='search-buffer'>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                      </div> */}
                      {/* <div id='search-buffer-button'>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                      </div> */}
                      </form>
                      <div id='mm'>
                        <li className="nav-item">
                          <button id='metamask' className="btn btn-outline-success" onClick={() => { ethereum.request({ method: 'eth_requestAccounts' })}} type="submit">Connect MetaMask</button>
                        </li>
                      </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )};
  }

  export default Header;