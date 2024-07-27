"use client"
import getCampaignInstance from '@/ethereum/campaign'
import web3 from '@/ethereum/web3'
import React, { useState } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState(0)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const accounts = await web3.eth.getAccounts()
            const campaignInstance = getCampaignInstance(address);
            await campaignInstance.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether")
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)

    }

    return (
        <Form onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold">Contribute to this campaigns!</h3>
            <Form.Field>
                <label htmlFor="contribution">Amount to contribute</label>
                <Input type='number' label="ether" labelPosition='right' value={value} onChange={({ target }) => setValue(target.value)} />
            </Form.Field>
            <Button primary loading={loading}>Contribute!</Button>
        </Form>
    )
}

export default ContributeForm