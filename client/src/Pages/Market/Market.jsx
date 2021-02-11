import React, { Component } from 'react';
import "./Market.css";


class Market extends Component {
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

      addCoin(coin) {
        
      }
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
                <tbody>{
                this.state.urls.map(coin => ( 
                    <tr key={coin.id}>
                        <td><img height={30} width={30}src={coin.image}/></td>
                        <td>{coin.symbol}</td>
                        <td>{coin.name}</td>
                        <td className='blink_me'>{'$' + coin.current_price}</td>
                        <td style={{ color: 'green' }}>{'$' + coin.high_24h}</td>
                        <td style={{ color: 'red' }}>{'$' + coin.low_24h}</td>
                    </tr>
                ))}</tbody>
            </table>
        </div> 
      )};
  }

  export default Market;