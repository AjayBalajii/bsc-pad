//import React from 'react';
import React, { Component } from 'react';
//import secondpage from './secondpage';
import './App.css';
import web3 from './web3';
import tokencontract from './tokencontract';
import TESTToken from './TESTToken';
//import TEST from './TEST';
//import {BrowserRouter as Router , Route , Link , Switch , NavLink} from "react-router-dom";

class home extends Component {
  state = {
    balance: '',
    totalSupply:'',
    circulatingsupply:'',
    name:'',
    symbol:'',
    decimal:'' 


  };

    
  async componentDidMount() {
    
   
    const balance = await web3.eth.getBalance(tokencontract.options.address);
    const totalsupply = await tokencontract.methods.totalSupply().call();
    const decimal = await TESTToken.methods.decimals().call();
  
    const name = await TESTToken.methods.name().call();
    const symbol = await TESTToken.methods.symbol().call();

    //const price=await testtoken.methods.getDollarPrice().call();
  
    this.setState({totalsupply,balance,name,symbol,decimal});

    
  }
  
  
  render()
   {
    console.log(web3.version);
    web3.givenProvider.enable().then(console.log);
    return (
      <div>
       
        <h2>BSC PAD</h2>
        <p>
          name <br/> {this.state.name}.
        </p>
        <p>
          symbol <br/> {this.state.symbol}.
        </p>
        <p>
           total supply <br/> {this.state.totalsupply}. 
        </p>

        <p>
          balanceOf<br/> {this.state.balance}.
         </p>
         <p>
          decimals <br/> {this.state.decimal}.
        </p>

        <hr />

        </div>
    );
  }
}


export default home;
