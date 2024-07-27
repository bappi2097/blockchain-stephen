"use client"
import getCampaignInstance from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
const { Row, Cell } = Table;

const RequestRow = ({ request, index, address, approversCount }) => {
    const { refresh } = useRouter()
    const [loading, setLoading] = useState({ approve: false, finalize: false })

    const onApprove = async () => {
        setLoading((prev) => ({ ...prev, approve: true }))
        try {
            const accounts = await web3.eth.getAccounts();
            const campaignInstance = getCampaignInstance(address);
            await campaignInstance.methods.approveRequest(index).send({
                from: accounts[0]
            });
            refresh()
        } catch (err) {
            console.log(err)
        }
        setLoading((prev) => ({ ...prev, approve: false }))
    }

    const onFinalize = async () => {
        setLoading((prev) => ({ ...prev, finalize: true }))
        try {
            const accounts = await web3.eth.getAccounts();
            const campaignInstance = getCampaignInstance(address);
            await campaignInstance.methods.finalizeRequest(index).send({
                from: accounts[0]
            });
            refresh()
        } catch (err) {
            console.log(err)
        }
        setLoading((prev) => ({ ...prev, finalize: false }))
    }

    const rowColor = (parseInt(request.approvalCount) >= parseInt(approversCount) / 2) && !request.complete ? 'bg-yellow-200' : ''

    return (
        <Row className={`${rowColor}`} disabled={request.complete}>
            <Cell>{index + 1}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
            <Cell className='break-word'>{request.recipient}</Cell>
            <Cell>{String(request.approvalCount)}/{String(approversCount)}</Cell>
            <Cell>
                <Button disabled={request.complete} color='green' basic onClick={onApprove} loading={loading.approve}>Approve</Button>
            </Cell>
            <Cell>
                <Button disabled={request.complete} color="teal" basic onClick={onFinalize} loading={loading.finalize}>Finalize</Button>
            </Cell>
        </Row>
    )
}

export default RequestRow