import React, { Component } from 'react'

import Web3 from 'web3';
// const ParseServer = require('parse-server').ParseServer;
import { ethers } from 'ethers'
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
// var Parse = require('parse/node').Parse;

let web3
let provider;
class AddressLabel extends Component {
	constructor(props) {
		super(props)

		// Set initial state
		this.state = { msg: '' }

		// Binding this keyword
		this.handleClick = this.handleClick.bind(this)

		// Binding this keyword
		this.setAddress = this.setAddress.bind(this)
		this.setAddress()
	}

	setAddress(params) {
		window.ethereum.on('connect', (connectInfo) => {
			console.log("connect")
			console.log(connectInfo)
			// this.state = { msg: connectInfo }
			// Changing state
			this.setState({ msg: connectInfo })
		});

		window.ethereum.on('accountsChanged', (accounts) => {

			console.log("accountsChanged")
			console.log(accounts)
			console.log(accounts[0])

			// Changing state
			this.setState({ msg: accounts[0] })
		});
	}



	async handleClick() {


		console.log('getAddress')
		if (!(window.ethereum)) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await window.ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3(window.ethereum);

				//provider 
				provider = new ethers.providers.Web3Provider(window.ethereum, "any");

			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner();
		console.log("signer")
		let userAddress = await signer.getAddress();

		console.log("userAddress")
		console.log(userAddress)

		// Changing state
		this.setState({ msg: userAddress })
	}

	render() {
		return (
			<div>
				<h2>User address :</h2>
				<p>{this.state.msg}</p>
				{/* Set click handler */}
				<button onClick={this.handleClick}>
					getAddress
				</button>
			</div>
		)
	}
}

export default AddressLabel
