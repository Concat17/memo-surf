import React from "react"
import { XmlProps } from "react-native-svg"
import { IconBasic } from "./IconBase"
import importIcon from "../svg/import"

type ImportIconProps = Omit<XmlProps, "xml">

export const ImportIcon = (props: ImportIconProps) => <IconBasic xml={importIcon} {...props} />
