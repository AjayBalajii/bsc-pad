import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ReactDOM from "react-dom";
import BEP20Token from "./BEP20Token";

import tokencontract from './tokencontract';
import TESTToken from './TESTToken';
import TEST from './TEST';
import $, { event, get } from 'jquery';
import Web3 from 'web3';







class secondpage extends Component{
  state = {
    balance: '',
    totalSupply:'',
    circulatingsupply:'',
    name:'',
    symbol:'',
    decimal:'',
    balance_BUSD:'',
  balance_TEST:'',
  setapprove:''


  };

    
  async componentDidMount() {
    
    
     const accounts = await  web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(tokencontract.options.address);
    const totalsupply = await tokencontract.methods.totalSupply().call();
    const decimal = await TESTToken.methods.decimals().call();
  
    const name = await TESTToken.methods.name().call();
    const symbol = await TESTToken.methods.symbol().call();
    const balance_BUSD = await BEP20Token.methods.balanceOf(accounts[0]).call();
    const balance_TEST= await TESTToken.methods.balanceOf(accounts[0]).call();

  
    this.setState({totalsupply,balance,name,symbol,decimal,balance_TEST,balance_BUSD});

    
  }
  render()
   {
     
     const approve = async (event) =>{
      event.preventDefault();
      const accounts = await  web3.eth.getAccounts();
      await BEP20Token.methods.approve("0x9C762c5F1A485d5c6EAaFbf128fe9ED71c908749","10000000000000000000000000000000").
      send({
        from: accounts[0]       
      });
      await TESTToken.methods.approve("0x9C762c5F1A485d5c6EAaFbf128fe9ED71c908749","10000000000000000000000000000").
      send({
        from: accounts[0]
       
      });
    } 


    const buyTest =async (event) => {
      
      event.preventDefault();
      const accounts = await  web3.eth.getAccounts();
      var amount=window.prompt("enter amount");
      alert(amount);
      await TEST.methods.buyTest(amount).send(
      {
      from:accounts[0]
      }
     );
     this.setState({amount});
    }



   

    web3.givenProvider.enable().then(console.log);
    return (
      <div>
       <h1>secondpage</h1>
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
        <p>
          balance_BUSD <br/> {this.state.balance_BUSD}.
        </p>
        <p>
          balance_TEST <br/> {this.state.balance_TEST}.
        </p>
        <div>
       
        </div>

        <div>
         <button onClick={approve} >aprove name</button>
         <button onClick={buyTest}>buy test</button>
        </div>

        <hr />

        </div>
    );
  }
}


export default secondpage;
