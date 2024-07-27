'use server'
import getCampaignInstance from "@/ethereum/campaign"

export async function getCampaignSummary(address) {
    const campaignInstance = getCampaignInstance(address);
    const response = await campaignInstance.methods.getSummary().call();
    return {
        minimumContribution: response['0'],
        balance: response['1'],
        requestsCount: response['2'],
        approversCount: response['3'],
        manager: response['4']
    };
}

export async function getAllRequestsByAddress(address) {
    const campaignInstance = getCampaignInstance(address);
    const requestsCount = await campaignInstance.methods.getRequestsCount().call();
    const approversCount = await campaignInstance.methods.approversCount().call();
    let requests = []
    try {
        requests = await Promise.all(
            Array(requestsCount).fill().map((_, index) => (
                campaignInstance.methods.requests(index).call())
            )
        )

    } catch (error) {
        // console.log(error)
    }
    return { requests, requestsCount, address, approversCount }
}