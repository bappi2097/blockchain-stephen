const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require('web3');

const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json")
const compiledCampaign = require("../ethereum/build/Campaign.json")

let accounts;
let factory;
let campaignAddress;
let campaign;

const MINIMUM_CONTRIBUTION = web3.utils.toWei("0.01", "ether");
const GAS_LIMIT = "1000000";

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: GAS_LIMIT });

    await factory.methods.createCampaign(MINIMUM_CONTRIBUTION)
        .send({ from: accounts[0], gas: GAS_LIMIT })
    const addresses = await factory.methods.getDeployedCampaigns().call({ from: accounts[0] })
    campaignAddress = addresses[addresses.length - 1];
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
})

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);

    });

    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('has minimum contribution amount as set', async () => {
        const contribution = await campaign.methods.minimumContribution().call();
        assert.equal(MINIMUM_CONTRIBUTION, contribution);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: MINIMUM_CONTRIBUTION,
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert.ok(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: web3.utils.toWei("0.005", "ether"),
                from: accounts[1]
            })
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest("Buy batteries", MINIMUM_CONTRIBUTION, accounts[1])
            .send({
                from: accounts[0],
                gas: GAS_LIMIT
            });
        const request = await campaign.methods.requests(0).call();
        assert.equal("Buy batteries", request.description);
    });

    it('processes requests', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });

        await campaign.methods
            .createRequest("Buy batteries", web3.utils.toWei("5", "ether"), accounts[1])
            .send({ from: accounts[0], gas: GAS_LIMIT });

        await campaign.methods.approveRequest(0)
            .send({ from: accounts[0], gas: GAS_LIMIT });

        await campaign.methods.finalizeRequest(0)
            .send({ from: accounts[0], gas: GAS_LIMIT });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        assert(balance > 1000)
    });

})