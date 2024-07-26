"use client"
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
                <a href='#'>View Campaign</a>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </>
  )
}

export default Campaigns
