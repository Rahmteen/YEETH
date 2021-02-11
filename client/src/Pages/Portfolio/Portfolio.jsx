import React, { Component } from 'react';
import axios from 'axios';
import "./Portfolio.css";

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            intervalTimer: 3,
            intervalId: null,
            message: '',
            coins: [],
            coin: {id: 0},
            quantity: 0,
        };
        this.timer = this.timer.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddCoin = this.handleAddCoin.bind(this);
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

      updateMessage(event) {
        this.setState({
          message: event.target.value
        });
      }
    
      handleAddCoin() {
        var coins = this.state.coins;
        coins.push(this.state.coin);
    
        this.setState({
          coins: coins,
          coin: {id: 0}
        });
      }
    
      handleCoinChange(event) {
        let value = event.target.value
        let coin = this.state.urls.find(coin => coin.id == value)

        this.setState({
          coin: coin
        });
      }
    
      handleItemDeleted(i) {
        var coins = this.state.coins;
        coins.splice(i, 1);

        this.setState({
          coins: coins
        });
      }

      updateQuantity(event) {
        event.preventDefault();
        this.setState({
          quantity: event.target.value,
        })
        console.log(this.state.quantity)
      }
      
      renderRows() {
        var context = this;
        return  this.state.coins.map(function(coin, i) {
                  return (
                    <tr id='input-row' key={"item-" + i}>
                      <td >
                        <button id='delete' className="btn btn-outline-danger" onClick={context.handleItemDeleted.bind(context, i)}>Delete</button>
                      </td>
                      <td>
                        {/* <input type="text" value={o.name} onChange={context.handleCoinChange.bind(context, i)}/> */}
                        <div id='inputs'>{coin.name}</div>
                      </td>
                      <td>
                        <div id='inputs'>{coin.symbol}</div>
                      </td>
                      <td>
                        <input id='quantity' type='text' onChange={context.updateQuantity.bind(context)}/>
                      </td>
                      <td>
                        <div id='inputs'>{coin.current_price}</div>
                      </td>
                      <td>
                        <div id='inputs'>{context.state.quantity*coin.current_price}</div>
                      </td>
                    </tr>
                  );
                });
      }

      handleSubmit() {
        axios.post("/api/coin/create", {
            coins: this.state.coins
          })
          .then( (res) => {
            console.log("REs: ", res);
          })
          .catch((err) => {
            console.log("Err: ", err);
          })
        }
      onClick(event) {
        this.handleSubmit(event)
        this.handleAddCoin(event)
      }
    
      render() {
        return (
            <div id='input-header'>
            <div id='dropdown'>
            <select className="form-select" value={this.state.coin.id} onChange={this.handleCoinChange.bind(this)}>
                <option selected value="0">select coin
                  </option>{this.state.urls.map((coin, i) => (
                <option value={i} key={coin.id} value={coin.id}>{coin.name}
                </option>))}</select>
            </div>
            <div id='addcoin'>
            <button className="btn btn-outline-success" onClick={() => this.onClick()}>Add Coin</button>
            </div>
          <div id='table-header'>
          <table className="table table-responsive-xxl">
            <thead id='portfolio-header'>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Name</th>
                <th scope='col'>Symbol</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Market Price (USD)</th>
                <th scope='col'>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
          <hr/>
          </div>
          </div>
        );
      }
    }


export default Portfolio;