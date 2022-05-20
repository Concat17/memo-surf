import React, { useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing } from "../../theme"
import { translate } from "../../i18n/"
import { MenuIcon } from "../icons/MenuIcon"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32 }
const RIGHT: ViewStyle = { width: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const { headerText, headerTx, style, titleStyle, left, right } = props

  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={[ROOT, style]}>
      {left}
      <View style={TITLE_MIDDLE}>
        <Text style={[TITLE, titleStyle]} text={header} />
      </View>
      {right}
    </View>
  )
}
