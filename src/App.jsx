import React, { Component } from 'react';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          urls: [],
          intervalTimer: 3,
          intervalId: null,
      };
      this.timer = this.timer.bind(this)
    }

    timer() {
      console.log(this.state.urls)
      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc")
      .then(response => response.json())
      .then(data => this.setState({urls: data}))
      .catch(err => console.log('App.componentDidMount: get characters: ERROR: ', err));
      }

    componentDidMount() {
        this.timer();
        let intervalId = setInterval(this.timer, this.state.intervalTimer * 1000)
        this.setState({intervalId})
    }

    componentWillUnmount() {
      clearInterval(this.state.intervalId)
    }

    render() {
      return (
      <div>
        <Header urls={this.state.urls} />
        <Market urls={this.state.urls} />
      </div>
      )}
  }


class Header extends Component {
  render() {
    return (
      <div id='head'>
        <div class='nav justify-content-left'>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <a class='navbar-brand'><img height={75} width={135}src={'./img_src/yeeth logo.png'}></img></a>
              <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Portfolios</a>
                    </li>
                </ul>
                <form class="d-flex">
                  <div id='search-buffer'>
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                  </div>
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    )};
}


class Market extends Component {
  render(){
    return (
      <div id='market'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>image</th>
              <th>symbol</th>
              <th>name</th>
              <th>price (live)</th>
              <th>24H high</th>
              <th>24H low</th>
            </tr>
          </thead>
          <tbody> {this.props.urls.map(coin => ( 
            <tr key={coin.id}>
              <td><img height={30} width={30}src={coin.image}/></td>
              <td>{coin.symbol}</td>
              <td>{coin.name}</td>
              <td class='blink_me'>{'$' + coin.current_price}</td>
              <td class='green'>{'$' + coin.high_24h}</td>
              <td class='red'>{'$' + coin.low_24h}</td>
            </tr>)
          )}
          </tbody></table></div> 
    )};
}


export default App;