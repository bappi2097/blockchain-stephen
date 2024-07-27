"use client"

import React from 'react'
import { link } from '@/utils'
import RequestRow from './RequestRow';
import { Button, Table } from 'semantic-ui-react'

const { Header, HeaderCell, Row, Body } = Table;

const RequestSection = ({ address, requests, approversCount }) => {
    return (
        <>
            <Button primary onClick={link(`/campaigns/${address}/new-request`)}> Add Request </Button>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount(wei)</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {requests.map((request, index) => (
                        <RequestRow key={index} request={request} address={address} index={index} approversCount={approversCount} />
                    ))}
                </Body>
            </Table>
        </>
    )
}

export default RequestSection