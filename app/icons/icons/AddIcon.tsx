import React from "react"
import { XmlProps } from "react-native-svg"
import add from "../svg/add"
import { IconBasic } from "./IconBase"

type AddIconProps = Omit<XmlProps, "xml">

export const AddIcon = (props: AddIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={add} {...props} />
)
