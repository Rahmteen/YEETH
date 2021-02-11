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
      
      renderRows() {
        var context = this;
        return  this.state.coins.map(function(o, i) {
                  return (
                    <tr key={"item-" + i}>
                      <td>
                        <input
                          type="text"
                          value={o.name}
                          onChange={context.handleCoinChange.bind(context, i)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={context.handleItemDeleted.bind(context, i)}
                        >
                          Delete
                        </button>
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
        // fetch('/api/coin/create', {
        //   method: 'post',
        //   body: JSON.stringify(this.state.coins)})
        // .then(function(response) {
        //   return response.json();
        // }).then(function(data) {
        //   console.log(data);
        // });
      }
    
      render() {
        return (
          <div>
            <table className="">
              <thead>
                <tr>
                  <th>
                    Item
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </table>
            <hr/>
            <select
              value={this.state.coin.id}
              onChange={this.handleCoinChange.bind(this)}
            ><option value="0">select coin</option>{this.state.urls.map(coin => (
                <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))}</select>
            <button onClick={this.handleAddCoin.bind(this)}>Add Item</button>
            <button onClick={this.handleSubmit.bind(this)}>Add to port</button>
          </div>
        );
      }
    }


export default Portfolio;