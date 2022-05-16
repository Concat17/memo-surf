import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { QuestionEditorComponent } from "./components/question-editor"
import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../icons/icons/ArrowBackIcon"
import { Card } from "../../models/card/card"
import { Deck } from "../../models/deck/deck"
import { useStores } from "../../models"
import { AddIcon } from "../../icons/icons/AddIcon"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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

const EDIT: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  backgroundColor: color.palette.deepPurple,
}

const EDIT_INPUT: ViewStyle = {
  ...TEXT,
  padding: 10,
}

const EDIT_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

export const DeckEditorScreen: FC<StackScreenProps<NavigatorParamList, "deckEditor">> = observer(
  ({ navigation, route }) => {
    const goBack = () => {
      navigation.goBack()
    }

    const { collection } = useStores()

    const { deck } = route.params

    const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)

    useEffect(() => {
      const foundDeck = collection.getDeckByName(deck.name)
      setCurrentDeck(foundDeck)
    }, [collection])
    const { theme } = React.useContext(ThemeContext)

    console.log("name", currentDeck?.name)
    const questions = currentDeck?.cards

    const goEditorScreen = (card?: Card | null) => navigation.navigate("cardEditor", { card })
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
            right={
              <AddIcon
                onPress={() => {
                  goEditorScreen()
                }}
                fill={theme.colors.primary}
              />
            }
            headerTx="editorScreen.header"
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
          />

          <View>
            {currentDeck ? (
              <FlatList
                keyExtractor={(deck) => String(deck.id)}
                data={[...questions]}
                renderItem={({ item }) => (
                  <QuestionEditorComponent
                    question={item}
                    onCardPress={() => goEditorScreen(item)}
                  />
                )}
              />
            ) : (
              <View>
                <Text>No questions</Text>
              </View>
            )}
          </View>
        </Screen>
      </View>
    )
  },
)
