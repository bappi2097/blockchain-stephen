"use client"
import web3 from '@/ethereum/web3';
import { link } from '@/utils';
import React from 'react'
import { Button, Card } from 'semantic-ui-react';

const CampaignDetails = ({ summary, address }) => {
    const items = [
        {
            header: summary.manager,
            meta: 'Address of Manager',
            description: "The manager created this campaign and can create requests to withdraw money",
            style: { overflowWrap: "break-word" }
        },
        {
            header: String(summary.minimumContribution),
            meta: 'Minimum Contribution (wei)',
            description: "You must contribute at least much wei to become an approver",
            style: { overflowWrap: "break-word" }
        },
        {
            header: String(summary.requestsCount),
            meta: 'Number of Requests',
            description: "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            style: { overflowWrap: "break-word" }
        },
        {
            header: String(summary.approversCount),
            meta: 'Number of approvers',
            description: "Number of people who have already donated to this campaign",
            style: { overflowWrap: "break-word" }
        },
        {
            header: String(web3.utils.fromWei(summary.balance, 'ether')),
            meta: 'Campaign Balance (ehter)',
            description: "The balance is how much money this campaign left to spend.",
            style: { overflowWrap: "break-word" }
        },
    ]
    return (
        <div>
            <Card.Group items={items} />
            <div className='mt-4'>
                <Button primary onClick={link(`/campaigns/${address}/requests`)}>View Requests</Button>
            </div>
        </div>
    )

}

export default CampaignDetails;