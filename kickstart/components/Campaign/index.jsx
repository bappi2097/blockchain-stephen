"use client"
import { Button, Card } from "semantic-ui-react"

const CampaignSection = ({ items }) => {
  return (
    <>
      <h3 className="text-2xl my-2">Open Campaigns</h3>
      <div className="flex gap-2">
        <Card.Group className="w-[calc(100%-200px)] mr-2">
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
        <Button content='Create Campaign' icon='add circle' className="w-[200px] h-12" primary />
      </div>
    </>
  )
}

export default CampaignSection
