import React, { FC } from "react"
import { View, ViewStyle, TextStyle, TextInput } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../icons/icons/ArrowBackIcon"

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

export const CardEditorScreen: FC<StackScreenProps<NavigatorParamList, "cardEditor">> = observer(
  ({ navigation, route }) => {
    const goBack = () => {
      navigation.goBack()
    }

    const { card } = route.params

    const [question, setQuestion] = React.useState(card?.question ?? "")
    const [answer, setAnswer] = React.useState(card?.answer ?? "")

    const { theme } = React.useContext(ThemeContext)

    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
            headerTx="editorScreen.header"
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
          />
          <TextInput
            style={EDIT_INPUT}
            defaultValue={question}
            onChangeText={setQuestion}
            placeholder="Question"
          />
          <TextInput
            style={EDIT_INPUT}
            defaultValue={answer}
            onChangeText={setAnswer}
            placeholder="Answer"
          />
          <Button
            testID="next-screen-button"
            style={EDIT}
            textStyle={EDIT_TEXT}
            tx="common.save"
            onPress={() => {
              card.edit(question, answer)
              goBack()
            }}
          />
        </Screen>
      </View>
    )
  },
)
