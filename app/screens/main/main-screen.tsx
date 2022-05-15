import React, { FC, useCallback, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, Switch } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Button, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"
import { ThemeContext } from "../../app"

// import deck from "../../../packs/interval_pack.json"
// import { Decks } from "./components/decks"
// import { Deck } from "../../models/deck/deck"
import { MenuIcon } from "../../icons/icons/MenuIcon"
import { ImportIcon } from "../../icons/icons/ImportIcon"

import * as storage from "../../utils/storage"
import { Decks } from "./components/decks"
const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  position: "relative",
  backgroundColor: color.transparent,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const EDIT: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  backgroundColor: color.palette.deepPurple,
}

const EDIT_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
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
  // lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const MAIN_CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  marginTop: spacing[4],
}
// StackScreenProps
export const MainScreen: FC<StackScreenProps<NavigatorParamList, "main">> = observer(
  ({ navigation }) => {
    const { setThemeOption, theme } = React.useContext(ThemeContext)
    const { collection } = useStores()
    const [headerHeight, setHeaderHeight] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const importDeck = useCallback(async () => {
      const result = await DocumentPicker.getDocumentAsync({})
      if (result.type === "success") {
        const exportedFileContent = await FileSystem.readAsStringAsync(result.uri)

        const deck = JSON.parse(exportedFileContent)
        await collection.import(deck)
      }
    }, [collection])

    // const loadDeck = useCallback(async () => {
    //   await collection.import(deck)
    // }, [collection])

    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState)
      setThemeOption((prev) => (prev === "Light" ? "Dark" : "Light"))
    }

    console.log("render")
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.background, theme.background]} />

        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout
            setHeaderHeight(height)
            console.log("height", height)
          }}
        >
          <Header
            left={
              <MenuIcon
                onPress={async () => console.log(await storage.save("@test", "test"))}
                fill={theme.primary}
              />
            }
            right={<ImportIcon onPress={importDeck} fill={theme.primary} />}
            headerTx="mainScreen.header"
            style={{ ...HEADER, backgroundColor: theme.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.primary }}
          />
        </View>

        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <View style={MAIN_CONTAINER}>
            {/* <Button
              testID="next-screen-button"
              style={EDIT}
              textStyle={EDIT_TEXT}
              tx="mainScreen.import"
              onPress={loadDeck}  
            />
            <Button
              text="open"
              style={{ ...EDIT, backgroundColor: theme.primary }}
              onPress={importDeck}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            /> */}
            <Decks decks={collection.decks} nav={navigation} />
          </View>
        </Screen>
      </View>
    )
  },
)
