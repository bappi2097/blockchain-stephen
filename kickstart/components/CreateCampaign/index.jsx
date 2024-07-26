"use client"
import factory from "@/ethereum/factory"
import web3 from "@/ethereum/web3"
import { link } from "@/utils"
import React, { useState } from "react"
import { Button, Form, Input, Message } from "semantic-ui-react"

export default function CreateCampaignForm() {
  const [minimumContribution, setMinimumContribution] = useState()
  const [errorField, setErrorField] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const route = link("/")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(undefined)

    if (!minimumContribution || minimumContribution <= 0) {
      setErrorField({
        content: "Please enter valid wei",
        pointing: "below",
      })
      setLoading(false)
      return
    }
    try {
      const accounts = await web3.eth.getAccounts()

      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      })
      route()
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit} error={error}>
      <Form.Field required error={errorField}>
        <label htmlFor=''>Minimum Contribution (Wei)</label>
        <Input
          labelPosition='right'
          label='Wei'
          type='number'
          placeholder='1000000'
          value={minimumContribution}
          onChange={(e) => {
            if (errorField) {
              setErrorField(undefined)
            }
            setMinimumContribution(e.target.value)
          }}
        />
      </Form.Field>
      <Message error header='Oops!' content={error}></Message>
      <Button type='submit' primary loading={loading}>
        Create!
      </Button>
    </Form>
  )
}
