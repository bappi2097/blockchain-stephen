"use client"

import Link from "next/link"
import { link } from "@/utils"
import { useState } from "react"
import web3 from "@/ethereum/web3"
import getCampaignInstance from "@/ethereum/campaign"
import { Button, Form, Input, Message } from "semantic-ui-react"

export default function NewRequest({ params }) {
    const route = link(`/campaigns/${params.address}/requests`)
    const [value, setValue] = useState({
        description: "",
        value: 0,
        recepient: ""
    })
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const handleChange = (field) => ({ target }) => {
        setValue((prev) => ({ ...prev, [field]: target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(undefined)
        try {
            const campaignInstance = getCampaignInstance(params.address)
            const accounts = await web3.eth.getAccounts()
            await campaignInstance.methods
                .createRequest(value.description, web3.utils.toWei(value.value, "ether"), value.recepient)
                .send({ from: accounts[0] })
            route()
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
        setLoading(false)
    }

    return (
        <>
            <Link href={`/campaigns/${params.address}/requests`}>Back</Link>
            <h3 className="text-xl font-bold">Create a Request</h3>
            <Form onSubmit={handleSubmit} error={error}>
                <Form.Field required>
                    <label>Description</label>
                    <Input value={value.description} onChange={handleChange("description")} />
                </Form.Field>
                <Form.Field required>
                    <label>Value in Ether</label>
                    <Input label="ether" labelPosition="right" value={value.value} onChange={handleChange("value")} />
                </Form.Field>
                <Form.Field required>
                    <label>Recipient</label>
                    <Input value={value.recepient} onChange={handleChange("recepient")} />
                </Form.Field>
                <Message error header='Oops!' content={error} />
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </>
    )
}
