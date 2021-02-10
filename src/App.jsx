import React, { Component } from 'react';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
          urls: [],
          intervalTimer: 1,
          intervalId: null,
      };
      this.timer = this.timer.bind(this)
    }

    timer() {
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
      <div>YEETH</div>
    )};
}


class Market extends Component {
    render(){
         return (
         <div id='btc'>
         <table className='table table-striped'>
           <thead>
             <tr>
             <th>image</th>
             <th>name</th>
             <th>price</th>
             </tr>
           </thead>
           <tbody>
           {this.props.urls.map(coin => (
            <tr key={coin.id}><td>
            <img height={30} width={30}src={coin.image}/></td>
            <td>{coin.name}</td>
            <td>{coin.current_price}</td>
            </tr>))
         }</tbody></table></div> 
    )};
}

export default App;