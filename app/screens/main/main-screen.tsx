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

import { Decks } from "./components/decks"
import { SettingsIcon } from "../../components/icons/SettingsIcon"
import { ImportIcon } from "../../components/icons/ImportIcon"
import { AddIcon } from "../../components/icons/AddIcon"
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

const RIGHT_ICONS: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}
const PLACEHOLDER_VIEW: ViewStyle = {
  marginLeft: 60,
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

    const goDeckParamsScreen = useCallback(() => navigation.navigate("deckParamsEditor"), [
      navigation,
    ])

    console.log("render", theme)
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />

        <View>
          <Header
            left={
              <View>
                <View style={PLACEHOLDER_VIEW}></View>
                <SettingsIcon
                  onPress={() => navigation.navigate("settings")}
                  fill={theme.colors.primary}
                />
              </View>
            }
            right={
              <View style={RIGHT_ICONS}>
                <ImportIcon onPress={importDeck} fill={theme.colors.primary} />
                <AddIcon fill={theme.colors.primary} onPress={goDeckParamsScreen} />
              </View>
            }
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
