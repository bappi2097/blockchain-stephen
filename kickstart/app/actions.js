'use server'

import web3 from "@/ethereum/web3";
import getCampaignInstance from "@/ethereum/campaign"

const getRequestsCount = async (campaignInstance) => {
    let count = 0;
    while (true) {
        try {
            await campaignInstance.methods.requests(count).call();
            count++;
        } catch (error) {
            break;
        }
    }
    return count;
};

export async function getCampaignSummary(address) {
    const campaignInstance = getCampaignInstance(address);

    const promises = [];
    promises.push(campaignInstance.methods.minimumContribution().call())
    promises.push(web3.eth.getBalance(address));
    promises.push(getRequestsCount(campaignInstance));
    promises.push(campaignInstance.methods.approversCount().call())
    promises.push(campaignInstance.methods.manager().call())

    // TODO: When design will complete comment in this
    const [
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager
    ] = await Promise.all(promises)

    // const [
    //     minimumContribution,
    //     balance,
    //     requestsCount,
    //     approversCount,
    //     manager
    // ] = [1000n, 0n, 0, 0n, "0x61E086726cC021911A527ac0CE4D29B91bB53088"]

    return {
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager
    }
}

// TODO: if new contract deployed
// export async function getCampaignSummary(address) {
//     const campaignInstance = getCampaignInstance(address);
//     const response = await campaignInstance.methods.getSummary().call();
//     return {
//         minimumContribution: response['0'],
//         balance: response['1'],
//         requestsCount: response['2'],
//         approversCount: response['3'],
//         manager: response['4']
//     };
// }