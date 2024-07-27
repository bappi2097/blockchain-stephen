"use client"
import web3 from '@/ethereum/web3'
import React, { useState } from 'react'
import getCampaignInstance from '@/ethereum/campaign'
import { Button, Form, Input, Message } from 'semantic-ui-react'

import { useRouter } from "next/navigation"

const ContributeForm = ({ address }) => {
    const { refresh } = useRouter()
    const [value, setValue] = useState(0)
    const [error, setError] = useState()
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
            refresh()
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
        setLoading(false)
    }

    return (
        <Form onSubmit={handleSubmit} error={error}>
            <h3 className="text-xl font-bold">Contribute to this campaigns!</h3>
            <Form.Field>
                <label htmlFor="contribution">Amount to contribute</label>
                <Input type='number' label="ether" labelPosition='right' value={value} onChange={({ target }) => setValue(target.value)} />
            </Form.Field>
            <Message error header='Oops!' content={error}></Message>
            <Button primary loading={loading}>Contribute!</Button>
        </Form>
    )
}

export default ContributeForm