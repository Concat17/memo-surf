import { StackNavigationProp } from "@react-navigation/stack"
import { getFullScope } from "i18n-js"
import * as React from "react"
import { Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native"
import { ThemeContext } from "../../../app"
import { Deck } from "../../../models/deck/deck"
import { NavigatorParamList } from "../../../navigators"
import { color, spacing, typography } from "../../../theme"

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.secondary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const FULL: ViewStyle = {
  marginBottom: spacing[5],
}

const DIVIDER_STYLE: ViewStyle = {
  marginTop: spacing[2],
  borderBottomWidth: 1,
}

const COLLECTION_NAME_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 20,
  letterSpacing: 2,
  alignSelf: "center",
}

interface DeckProps {
  deck: Deck
  onPress: () => void
  onLongPress: () => void
  nav: StackNavigationProp<NavigatorParamList, "main">
}

export const DeckComponent = ({ deck, onPress, onLongPress }: DeckProps) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <TouchableHighlight
      style={{ ...FULL }}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.6}
      underlayColor={theme.colors.background}
    >
      <View>
        <Text style={{ ...COLLECTION_NAME_TEXT, color: theme.colors.primary }}>{deck.name}</Text>
        <View style={{ ...DIVIDER_STYLE, borderBottomColor: theme.colors.primary }} />
      </View>
    </TouchableHighlight>
  )
}
