import React from "react"
import { XmlProps } from "react-native-svg"
import arrowIcon from "../svg/arrow"
import { IconBasic } from "./IconBase"

type ArrowIconProps = Omit<XmlProps, "xml">

export const ArrowBackIcon = (props: ArrowIconProps) => <IconBasic xml={arrowIcon} {...props} />
