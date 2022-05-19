import React, { FC, useCallback, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { QuestionEditorComponent } from "./components/question-editor"
import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../icons/icons/ArrowBackIcon"
import { Card } from "../../models/card/card"
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
        navigation.navigate("cardEditor", { card })
      },
      [navigation],
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
            {questions.length > 0 ? (
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
