import React from "react"
import { XmlProps } from "react-native-svg"
import { IconBasic } from "./IconBase"

type AddIconProps = Omit<XmlProps, "xml">

const addIcon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.75 7C12.75 6.58579 12.4142 6.25 12 6.25C11.5858 6.25 11.25 6.58579 11.25 7V11.25H7C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75H11.25V17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V12.75H17C17.4142 12.75 17.75 12.4142 17.75 12C17.75 11.5858 17.4142 11.25 17 11.25H12.75V7Z"/>
</svg>`

export const AddIcon = (props: AddIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={addIcon} {...props} />
)
