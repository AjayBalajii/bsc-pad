//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import tokencontract from './tokencontract';
import TESTToken from './TESTToken';
import TEST from './TEST';
import $, { event } from 'jquery';
import Web3 from 'web3';







class App extends Component {
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
    const decimal = await TESTToken.methods.name().call();
  
    const name = await TESTToken.methods.name().call();
    const symbol = await TESTToken.methods.symbol().call();

    //const price=await testtoken.methods.getDollarPrice().call();
  
    this.setState({totalsupply,balance,name,symbol,decimal});

    
  }
  
  
  render()
   {
    console.log(web3.version);
    const onSubmitNFT = async (event)=>{
      alert("hiii");
      window.addEventListener('load', async () => { 
        if (window.TESTToken) {
            window.web3 = new Web3(TESTToken);
            try {
              await TESTToken.enable();
              initPayButton()
            } 
            catch (err) {
              $('#status').html('User denied account access', err)
            }
          } 
          else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider)
            initPayButton()
          } 
          else {
            $('#status').html('No Metamask (or other Web3 Provider) installed')
          }
          })
    
        const initPayButton = () => {
          $('.pay-button').click(() => {
            // paymentAddress is where funds will be send to
            const paymentAddress = '0x3E4a01Ad002ce1f9CE287423c7A3A1a30cC3a7F9'
            const amountEth = 1
    
            web3.eth.sendTransaction({
              to: paymentAddress,
              value: web3.toWei(amountEth, 'ether')
            }, (err, transactionId) => {
              if  (err) {
                console.log('Payment failed', err)
                $('#status').html('Payment failed')
              } else {
                console.log('Payment successful', transactionId)
                $('#status').html('Payment successful')
              }
            })
          })
        }
    
    };

    web3.givenProvider.enable().then(console.log);
    return (
      <div>
       <div>
         <form onSubmit={onSubmitNFT}>
    <button class="pay-button btn btn-primary" type="submit">connect wallet</button>
    </form>
    <div id="status"></div>

    
  </div>
        <h2>Bsc pad</h2>
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


export default App;
