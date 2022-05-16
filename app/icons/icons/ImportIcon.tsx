import React from "react"
import { XmlProps } from "react-native-svg"
import importIcon from "../svg/import"
import { IconBasic } from "./IconBase"

type ImportIconProps = Omit<XmlProps, "xml">

export const ImportIcon = (props: ImportIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={importIcon} {...props} />
)
