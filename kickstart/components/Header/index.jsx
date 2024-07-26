"use client"
import { link, getPathName } from "@/utils"
import { Menu } from "semantic-ui-react"

const Header = () => {
  const pathname = getPathName()
  return (
    <Menu>
      <Menu.Item onClick={link("/")}>CrowdCoin</Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item
          active={pathname === "/campaigns"}
          onClick={link("/campaigns")}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          active={pathname === "/campaigns/new"}
          onClick={link("/campaigns/new")}
        >
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Header
