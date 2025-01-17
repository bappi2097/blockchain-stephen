require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(process.env.MNEMONIC_KEY, process.env.NEXT_PUBLIC_NETWORK_URL);
const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);

        const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode })
            .send({ gas: '1000000', from: accounts[0] });

        console.log('Contract deployed to', result.options.address);
    } catch (error) {
        console.error('Deployment failed:', error);
    } finally {
        provider.engine.stop();
    }
};

deploy();
