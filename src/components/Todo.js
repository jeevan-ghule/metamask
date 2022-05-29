
import Web3 from 'web3';
import React, { Component } from 'react'
// const ParseServer = require('parse-server').ParseServer;
import { ethers } from 'ethers'
import { recoverPersonalSignature } from 'eth-sig-util';
// import { recoverPersonalSignature } from '@metamask/eth-sig-util';


import { bufferToHex } from 'ethereumjs-util';
// var Parse = require('parse/node').Parse;
// Parse.initialize("myAppId");
// Parse.serverURL = 'http://localhost:1337/parse'
import Parse from 'parse';

let address = ""

let web3
let provider;


class ToDo extends Component {

    constructor(props) {
        super(props)

        // Set initial state
        this.state = { msg: '{}' }

        // Binding this keyword
        this.linkUser = this.linkUser.bind(this)

        // Binding this keyword
        this.handleSignMessage = this.handleSignMessage.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.fileToByteArray = this.fileToByteArray.bind(this)

    }

    // getAddress = async () => {

    //     console.log('getAddress')
    //     if (!(window.ethereum)) {
    //         window.alert('Please install MetaMask first.');
    //         return;
    //     }

    //     if (!web3) {
    //         try {
    //             // Request account access if needed
    //             await window.ethereum.enable();

    //             // We don't know window.web3 version, so we use our own instance of Web3
    //             // with the injected provider given by MetaMask
    //             web3 = new Web3(window.ethereum);

    //             //provider 
    //             provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    //         } catch (error) {
    //             window.alert('You need to allow MetaMask.');
    //             return;
    //         }
    //     }

    //     await provider.send("eth_requestAccounts", []);
    //     const signer = provider.getSigner();
    //     console.log("signer")
    //     let userAddress = await signer.getAddress();

    //     console.log("userAddress")
    //     console.log(userAddress)

    //     address = userAddress

    // }

    async linkUser(signObject) {

        let auth = {
            authData: {
                id: signObject.publicAddress,
                data: signObject.message,
                signature: signObject.signature
            },
            options: "dddd"
        }
        try {
            // var user = new Parse.User()
            // let res = await user.linkWith('anonymous', auth);
            // let res = await Parse.UserConstructor.logInWith('myAuth', auth);
            // let res = await new Parse.UserConstructor().logInWith('myAuth', auth);



            const res = await Parse.User.logInWith('myAuth', auth)

            console.log(res)

            console.log(JSON.stringify(res))

            // this.state = { msg: "donne" }

            // Changing state
            this.setState({ msg: JSON.stringify(res) })
            // console.log("user._isLinked(myAuth) " + user._isLinked("myAuth"))

            console.log(Parse.User.current())
            // const params = { movie: "The Matrix" };
            // const ratings = await Parse.Cloud.run("averageStars", params);
            // console.log(ratings)


        } catch (error) {
            console.error(error.message)
        }

    }
    async handleSignMessage(publicAddress,
        nonce) {

        // handleSignMessage = async (
        //     publicAddress,
        //     nonce
        // ) => {

        console.log("publicAddress" + publicAddress)
        console.log("nonce" + nonce)
        try {
            // let message = `I am signing my one-time nonce: ${nonce}`
            let message = "Jeevan ghule"
            const signature = await web3.eth.personal.sign(message
                ,
                publicAddress,
                '' // MetaMask will ignore the password argument here
            );

            return { publicAddress, signature, message };
        } catch (err) {
            console.log(err)
            throw new Error(
                'You need to sign the message to be able to log in.'
            );
        }
    };
    async handleClick() {
        // Check if MetaMask is installed

        console.log('handleClick')
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

        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }

        const publicAddress = coinbase.toLowerCase();
        // // setLoading(true);

        console.log(publicAddress)

        let nonce = Math.floor(Math.random() * 10000);
        let signObject = await this.handleSignMessage(publicAddress, 2)
        console.log(signObject)


        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = bufferToHex(Buffer.from(signObject.message, 'utf8'));
        const address = recoverPersonalSignature({
            data: msgBufferHex,
            sig: signObject.signature,
        });


        await this.linkUser(signObject)


        // /*=======
        // CONNECT TO METAMASK
        // =======*/
        // console.log("provider")
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // console.log("signer")
        // let userAddress = await signer.getAddress();

        // console.log("userAddress")
        // console.log(userAddress)
        // let message = `I am signing my one-time nonce: 1`
        // let signature = await signer.signMessage(message, userAddress);
        // console.log(signature)


        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            window.alert('signature verify successfully');
            return;
        } else {
            window.alert('signature not verify successfully');
            return;
        }

    };

    async handleLogout() {
        // Check if MetaMask is installed

        console.log('handleClick')
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

        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            window.alert('Please activate MetaMask first.');
            return;
        }

        const publicAddress = coinbase.toLowerCase();
        // // setLoading(true);

        console.log(Parse.User.current())
        if (Parse.User.current()) {
            await Parse.User.logOut()

            console.log('Parse.User.current()')
            console.log(Parse.User.current())
            window.alert('Logout successfully');
        } else {
            console.log('User not login')
            window.alert('Please login first');
            return;
        }





        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        // if (address.toLowerCase() === publicAddress.toLowerCase()) {
        //     window.alert('signature verify successfully');
        //     return;
        // } else {
        //     window.alert('signature not verify successfully');
        //     return;
        // }

    };

    fileToByteArray(file) {
        return new Promise((resolve, reject) => {
            try {
                let reader = new FileReader();
                let fileByteArray = [];
                reader.readAsArrayBuffer(file);
                reader.onloadend = (evt) => {
                    if (evt.target.readyState == FileReader.DONE) {
                        let arrayBuffer = evt.target.result
                        console.log("arrayBuffer")
                        console.log(arrayBuffer)
                        console.log(typeof arrayBuffer)
                        let array = new Uint8Array(arrayBuffer);

                        console.log("array")
                        console.log(array)
                        for (const hh of array) {
                            fileByteArray.push(hh);
                        }
                    }
                    resolve(fileByteArray);
                }
            }
            catch (e) {
                reject(e);
            }
        })
    }

    render() {
        return (
            <div>
                <h1>MetaMask</h1>

                {/* Set click handler */}
                <button onClick={this.handleClick}>
                    Login
                </button>

                <h2>User Parse Object :</h2>
                <p>{this.state.msg}</p>


                <button onClick={this.handleLogout}>
                    Logout
                </button>

                <input type="file" id="files" name="files" multiple onChange={async (e) => {
                    console.log(" choodes")

                    let file = e.target.files[0]
                    console.log(file.name)
                    console.log(file)

                    let byteArray = await this.fileToByteArray(file)
                    // var path = (window.URL || window.webkitURL).createObjectURL(file);
                    console.log('byteArray', byteArray);

                    try {


                        const fileParse = new Parse.File('largeFIle.mp4', byteArray, 'video/mp4');

                        const result = await fileParse.save();

                        console.log('result: ', result);

                    } catch (error) {
                        console.error('error: ', error);
                    }



                }}></input>
            </div >
        )
    }

}

export default ToDo;