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

export const CardEditorScreen: FC<StackScreenProps<NavigatorParamList, "cardEditor">> = observer(
  ({ navigation, route }) => {
    const goBack = () => {
      navigation.goBack()
    }

    const { collection } = useStores()

    const { card, deckName } = route.params

    const [question, setQuestion] = React.useState(card?.question ?? "")
    const [answer, setAnswer] = React.useState(card?.answer ?? "")

    const { theme } = React.useContext(ThemeContext)

    const deck = collection.getDeckByName(deckName)

    const showAlert = () =>
      Alert.alert(
        "Confirm removing card",
        "Do you want to delete card?",
        [
          {
            text: "Delete",
            onPress: () => {
              deck.deleteQuestion(card)
              goBack()
            },
            style: "destructive",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        },
      )

    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Header
          left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
          right={
            card ? <TrashIcon onPress={showAlert} fill={theme.colors.primary} /> : <View></View>
          }
          headerTx="editorScreen.header"
          style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
          titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
        />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Text style={HINT_TEXT}>Enter question</Text>
          <TextInput
            style={{ ...EDIT_INPUT, borderColor: theme.colors.primary }}
            defaultValue={question}
            onChangeText={setQuestion}
            placeholder="Question"
          />
          <Text style={HINT_TEXT}>Enter answer</Text>
          <TextInput
            style={{ ...EDIT_INPUT, borderColor: theme.colors.primary }}
            defaultValue={answer}
            onChangeText={setAnswer}
            placeholder="Answer"
          />
          <Button
            testID="next-screen-button"
            style={{ ...EDIT, backgroundColor: theme.colors.background }}
            textStyle={{ ...EDIT_TEXT, color: theme.colors.primary }}
            tx="common.save"
            onPress={() => {
              if (card) {
                card.edit(question, answer)
              } else {
                deck.addQuestion(question, answer)
              }

              goBack()
            }}
          />
        </Screen>
      </View>
    )
  },
)
