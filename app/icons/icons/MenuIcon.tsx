import React from "react"
import { XmlProps } from "react-native-svg"
import { IconBasic } from "./IconBase"
// import menu from "../svg/menu"
const menu = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 12C19.75 11.5858 19.4142 11.25 19 11.25H5C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H19C19.4142 12.75 19.75 12.4142 19.75 12Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 7C19.75 6.58579 19.4142 6.25 19 6.25H5C4.58579 6.25 4.25 6.58579 4.25 7C4.25 7.41421 4.58579 7.75 5 7.75H19C19.4142 7.75 19.75 7.41421 19.75 7Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.75 17C19.75 16.5858 19.4142 16.25 19 16.25H5C4.58579 16.25 4.25 16.5858 4.25 17C4.25 17.4142 4.58579 17.75 5 17.75H19C19.4142 17.75 19.75 17.4142 19.75 17Z" />
</svg>`

type MenuIconProps = Omit<XmlProps, "xml">

export const MenuIcon = (props: MenuIconProps) => <IconBasic xml={menu} {...props} />
