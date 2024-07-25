"use client";
import { MenuMenu, MenuItem, Menu } from "semantic-ui-react"
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathname = usePathname()
    const handleItemClick = () => { }
    return (
        <Menu>
            <MenuItem
                name='browse'
                active={pathname === "/"}
                onClick={handleItemClick}
            >
                Browse
            </MenuItem>

            <MenuMenu position='right'>
                <MenuItem
                    name='signup'
                    active={pathname === "signup"}
                    onClick={handleItemClick}
                >
                    Sign Up
                </MenuItem>

                <MenuItem
                    name='help'
                    active={pathname === "help"}
                    onClick={handleItemClick}
                >
                    Help
                </MenuItem>
            </MenuMenu>
        </Menu>
    )
}

export default Header
