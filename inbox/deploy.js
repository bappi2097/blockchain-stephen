require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(process.env.MNEMONIC_KEY, process.env.NETWORK_URL);

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hello world!'] })
        .send({ from: accounts[0], gas: '1000000' })
    console.log('Contract deployed to', result.options.address);

    const message = await result.methods.message().call();
    console.log("Intial message", message);

    provider.engine.stop();
};

deploy();