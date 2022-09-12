import React, { FC, useCallback, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { QuestionEditorComponent } from "./components/question-editor"
import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../components/icons/ArrowBackIcon"
import { Card } from "../../models/card/card"
import { useStores } from "../../models"
import { AddIcon } from "../../components/icons/AddIcon"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.secondary,
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

const LIST_STYLE: TextStyle = {
  ...BOLD,
  marginBottom: 50,
}

const LIST_HEADER: ViewStyle = {
  padding: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}

const LIST_HEADER_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 15,
  letterSpacing: 2,
}

export const DeckEditorScreen: FC<StackScreenProps<NavigatorParamList, "deckEditor">> = observer(
  ({ navigation, route }) => {
    const { theme } = React.useContext(ThemeContext)
    const { collection } = useStores()

    const currentDeck = route.params?.deck

    const [questions, setQuestions] = useState<Card[]>(currentDeck?.cards ?? [])

    const goBack = () => {
      navigation.goBack()
    }

    const goEditorScreen = useCallback(
      (card?: Card | null) => {
        navigation.navigate("cardEditor", { card, deckName: currentDeck.name })
      },
      [currentDeck.name, navigation],
    )

    useEffect(() => {
      navigation.addListener("focus", () => {
        if (currentDeck?.name) {
          setQuestions([...collection.getDeckByName(currentDeck.name).cards])
        }
      })
    }, [collection, currentDeck?.name, navigation])

    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
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
            {questions.length > 0 ? (
              <FlatList
                keyExtractor={(deck) => String(deck.id)}
                data={[...questions]}
                style={LIST_STYLE}
                stickyHeaderIndices={[0]}
                ListHeaderComponent={
                  <View style={{ ...LIST_HEADER, backgroundColor: theme.colors.background }}>
                    <Text style={{ ...LIST_HEADER_TEXT, color: theme.colors.primary }}>
                      Question
                    </Text>
                    <Text style={{ ...LIST_HEADER_TEXT, color: theme.colors.primary }}>Answer</Text>
                  </View>
                }
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
