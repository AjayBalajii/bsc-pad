import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ReactDOM from "react-dom";
import BEP20Token from "./BEP20Token";
import {Card} from "react-bootstrap"
import tokencontract from './tokencontract';
import TESTToken from './TESTToken';
import TEST from './TEST';
import $, { event, get } from 'jquery';
import Web3 from 'web3';
import Background from '../src/images/aa.gif'







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
      <div class="text" style={{backgroundImage:"url("+ Background +")",backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'}}>
         <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
   integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"/>

        <br/> <br/>
        <h1 class="head"><b>
          Join Pool
          </b>

        </h1>
        <br/>
        <table>
          <div class="row justify-content-center">
            <div class="col-6">
            <Card bg="dark" border="warning" style={{ width: '23rem' , padding: "30px" , borderRadius: "8%" }} >
        <p>

Name <br/> {this.state.name}.
</p>
<p>
Symbol <br/> {this.state.symbol}.
</p>
<p>
 Total Supply <br/> {this.state.totalsupply}. 
</p>


        </Card>

            </div>
            <div class="col-2">
            <Card bg="dark" border="warning" style={{ width: '25rem' , padding: "30px",borderRadius: "8%" }} bodyStyle={{}} >

            <p>
          Decimals <br/> {this.state.decimal}.
        </p>
        <p>
          Balance_BUSD <br/> {this.state.balance_BUSD}.
        </p>
        <p>
          Balance_TEST <br/> {this.state.balance_TEST}.
        </p>
        
        </Card>

            </div>
          </div>
        </table>
        <br/>   <br/> 
    
          <div>
            <table>
              <div class="row">
                <div class="col-6">
                <button class="btn btn-outline-warning" onClick={approve}>aprove name</button>

                </div>
                <div class="col-2">
                <button  onClick={buyTest} class="btn btn-outline-warning " >buy test</button>

                </div>
              </div>
            </table>
        </div>

      
<br/>
<br/><br/>   <br/>   </div>
    );
  }
}


export default secondpage;
