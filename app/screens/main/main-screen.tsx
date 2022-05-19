import React, { FC, useCallback } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, GradientBackground, Header } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import { ThemeContext } from "../../app"

import { ImportIcon } from "../../icons/icons/ImportIcon"

import { Decks } from "./components/decks"
import { SettingsIcon } from "../../icons/icons/SettingsIcon"
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  position: "relative",
  backgroundColor: color.transparent,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const HEADER: TextStyle = {
  position: "relative",
  paddingTop: spacing[3],
  paddingBottom: spacing[3],
  paddingHorizontal: spacing[2],
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 20,
  // lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const MAIN_CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  marginTop: spacing[4],
}

export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const { theme } = React.useContext(ThemeContext)
    const { collection } = useStores()
    const importDeck = useCallback(async () => {
      const result = await DocumentPicker.getDocumentAsync({})
      if (result.type === "success") {
        const exportedFileContent = await FileSystem.readAsStringAsync(result.uri)

        const deck = JSON.parse(exportedFileContent)
        await collection.import(deck)
      }
    }, [collection])

    console.log("render", theme)
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />

        <View>
          <Header
            left={
              <SettingsIcon
                onPress={() => navigation.navigate("settings")}
                fill={theme.colors.primary}
              />
            }
            right={<ImportIcon onPress={importDeck} fill={theme.colors.primary} />}
            headerTx="mainScreen.header"
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
          />
        </View>

        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Decks decks={collection.decks} nav={navigation} />
        </Screen>
      </View>
    )
  },
)
