import React, { FC } from "react"
import { View, ViewStyle, TextStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { QuestionEditorComponent } from "./components/question-editor"
import { QuestionCreatorComponent } from "./components/question-creator"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

export const EditorScreen: FC<StackScreenProps<NavigatorParamList, "editor">> = observer(
  ({ navigation, route }) => {
    const goBack = () => {
      navigation.goBack()
    }

    const { deck } = route.params
    const { cards: questions } = deck
    return (
      <View style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="editorScreen.header"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View>
            <QuestionCreatorComponent deck={deck} />

            <FlatList
              keyExtractor={(deck) => String(deck.id)}
              data={[...questions]}
              renderItem={({ item }) => <QuestionEditorComponent question={item} />}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
