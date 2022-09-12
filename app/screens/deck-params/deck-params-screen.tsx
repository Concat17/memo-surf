import React, { FC } from "react"
import { View, ViewStyle, TextStyle, TextInput, Text, Alert } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../components/icons/ArrowBackIcon"
import { useStores } from "../../models"
import { TrashIcon } from "../../components/icons/TrashIcon"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  marginTop: 10,
  padding: spacing[3],
}

const HEADER: TextStyle = {
  position: "relative",
  paddingTop: spacing[3],
  paddingBottom: spacing[3],
  paddingHorizontal: spacing[2],
}

const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 20,
  textAlign: "center",
  letterSpacing: 1.5,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const HINT_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,

  marginBottom: 8,
}

const EDIT: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  backgroundColor: color.palette.deepPurple,
}

const EDIT_INPUT: ViewStyle = {
  ...TEXT,
  padding: 10,
  borderWidth: 1,
  borderRadius: 3,
  borderStyle: "solid",
  borderColor: "red",

  marginBottom: 15,
}

const EDIT_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const DeckParamsScreen: FC<
  StackScreenProps<NavigatorParamList, "deckParamsEditor">
> = observer(({ navigation, route }) => {
  const { theme } = React.useContext(ThemeContext)

  const goBack = () => {
    navigation.goBack()
  }

  const { collection } = useStores()

  const deck = route?.params?.deck

  const [name, setName] = React.useState(deck?.name ?? "")

  return (
    <View style={FULL}>
      <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
      <Header
        left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
        headerTx="editorScreen.header"
        style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
        titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
      />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Text style={HINT_TEXT}>Name</Text>
        <TextInput
          style={{ ...EDIT_INPUT, borderColor: theme.colors.primary }}
          defaultValue={name}
          onChangeText={setName}
          placeholderTextColor="grey"
          placeholder="Deck name"
        />

        <Button
          testID="next-screen-button"
          style={{ ...EDIT, backgroundColor: theme.colors.background }}
          textStyle={{ ...EDIT_TEXT, color: theme.colors.primary }}
          tx="common.add"
          onPress={() => {
            if (deck) {
              deck.changeDeckName(name)
            } else {
              collection.createDeck(name)
            }

            goBack()
          }}
        />
      </Screen>
    </View>
  )
})
