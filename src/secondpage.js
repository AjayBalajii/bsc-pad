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
  setapprove:'',
  ooc:'',
  At:''


  };

    
  async componentDidMount() {
    
    
     const accounts = await  web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(tokencontract.options.address);
    const totalsupply = await tokencontract.methods.totalSupply().call();
    const decimal = await TESTToken.methods.decimals().call();
    
    
    const At = await TESTToken.methods.balanceOf("0x9C762c5F1A485d5c6EAaFbf128fe9ED71c908749").call();
    const name = await TESTToken.methods.name().call();
    const symbol = await TESTToken.methods.symbol().call();
    const balance_BUSD = await BEP20Token.methods.balanceOf(accounts[0]).call();
    const balance_TEST= await TESTToken.methods.balanceOf(accounts[0]).call();

    const ooc = await TEST.methods.isTestOpen().call();
    

     

     if (ooc==true){
      document.getElementById("dem").innerHTML = "Open" ;

      document.getElementById("ap").disabled=false;
      document.getElementById("ap1").disabled=false;

     }
     else{
      document.getElementById("dem").innerHTML = "Closed" ;

     }
     var p=At/100000000000000000;
     p=p*100;
     var p1=p.toFixed(2);
     


  
    this.setState({totalsupply,balance,name,symbol,decimal,balance_TEST,balance_BUSD,At,p1});

    
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
 <Card bg="dark" border="warning" style={{ width: '23rem' , padding: "25px" , borderRadius: "8%" }} >
        <p>

Name <br/> {this.state.name}.
</p>
<p id="dem" class="pp">
</p>
<p>
Symbol <br/> {this.state.symbol}.
</p>
<p>
 Total Supply <br/> {this.state.totalsupply}. 
</p>

<p>
          Decimals <br/> {this.state.decimal}.
        </p>

        </Card>

            </div>
            <div class="col-2">
            <Card bg="dark" border="warning" style={{ width: '30rem' , padding: "25px",borderRadius: "9%" }} bodyStyle={{}} >

        <p>
          Balance_BUSD <br/> {this.state.balance_BUSD}.
        </p>
        <p>
          Balance_TEST <br/> {this.state.balance_TEST}.
        </p>
        <p>
          Available_Tokens <br/> {this.state.At}.
        </p>
        <p class="p">Progress (Available Tokens)</p>
        <progress id="file" value={this.state.At} max="100000000000000000" class="progress11"></progress>
        <div>
          <div class="container">
            <div class="row">
            <div class="col">
            <p class="perci">
          {this.state.p1}%
        </p>
            </div>
              <div class="col align-self-end">
              <p class="maxi">
        {this.state.At}/100000000000000000.
        </p>
                      </div>
            
            </div>
          </div>
        </div>
        <br/>
       

        </Card>

            </div>
          </div>
        </table>
        <br/>   <br/> 
    
          <div class="ma">
            <table>
              <div class="row">
                <div class="col-6">
                <button class="btn btn-outline-warning" onClick={approve} id="ap" disabled>aprove name</button>

                </div>
                <div class="col-2">
                <button  onClick={buyTest} class="btn btn-outline-warning " id="ap1" disabled >buy test</button>

                </div>
              </div>
            </table>
        </div>

      
<br/>

  </div>
    );
  }
}


export default secondpage;
