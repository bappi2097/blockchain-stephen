"use client"
import { Button, Card } from "semantic-ui-react"

const CampaignSection = ({ items }) => {
  return (
    <div>
      <Card.Group>
        {items.map((item, index) => (
          <Card key={index} fluid centered>
            <Card.Content>
              <Card.Header className='break-words'>{item}</Card.Header>
              <Card.Description>
                <a href='#'>View Campaign</a>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <div className="mt-5">
        <Button content='Create Campaign' icon='add circle' primary />
      </div>

    </div>
  )
}

export default CampaignSection
