"use client"
import Link from "next/link"
import { Card } from "semantic-ui-react"

const Campaigns = ({ items }) => {
  return (
    <>
      <Card.Group className='w-[calc(100%-200px)] mr-2'>
        {items.map((item, index) => (
          <Card key={index} fluid>
            <Card.Content>
              <Card.Header className='break-words'>{item}</Card.Header>
              <Card.Description>
                <Link href={`/campaigns/${item}`}>View Campaign</Link>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  )
}

export default Campaigns
