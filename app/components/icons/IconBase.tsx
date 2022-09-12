import React from "react"
import { SvgXml, XmlProps } from "react-native-svg"

type IconBaseProps = {
  xml: string
} & XmlProps

export function IconBasic({ xml, ...xmlProps }: IconBaseProps) {
  return (
    <SvgXml
      css={{ display: "flex", alignContent: "center", justifyContent: "center" }}
      xml={xml}
      {...xmlProps}
    />
  )
}
