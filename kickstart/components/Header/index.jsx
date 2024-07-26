"use client";
import { Menu } from "semantic-ui-react"
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter()
    return (
        <Menu>
            <Menu.Item link >
                CrowdCoin
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item onClick={() => {
                    router.push("/campaigns")
                }}>
                    Campaigns
                </Menu.Item>

                <Menu.Item onClick={() => {
                    router.push("/campaigns/new")
                }}>
                    +
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header
