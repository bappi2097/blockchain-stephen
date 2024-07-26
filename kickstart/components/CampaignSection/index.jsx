"use client"
import { Button } from "semantic-ui-react"
import Campaigns from "./Campaigns"
import { link } from "@/utils"

const CampaignSection = ({ items }) => {
  return (
    <>
      <Campaigns items={items} />
      <Button
        content='Create Campaign'
        icon='add circle'
        className='w-[200px] h-12'
        onClick={link("/campaigns/new")}
        primary
      />
    </>
  )
}

export default CampaignSection
