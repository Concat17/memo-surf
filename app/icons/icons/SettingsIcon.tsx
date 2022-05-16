import React from "react"
import { XmlProps } from "react-native-svg"
import settings from "../svg/settings"
import { IconBasic } from "./IconBase"

type SettingsIconProps = Omit<XmlProps, "xml">

export const SettingsIcon = (props: SettingsIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={settings} {...props} />
)
