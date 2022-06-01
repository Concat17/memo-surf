import React, { FC, useMemo } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { getSnapshot } from "mobx-state-tree"
import { CardComponent } from "./components/card"
import { ArrowBackIcon } from "../../components/icons/ArrowBackIcon"
import { DevContext, ThemeContext } from "../../app"
import { AnswerLevel } from "../../types/AnswerLevel"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  position: "relative",
  backgroundColor: color.transparent,

  padding: 10,
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

const ANSWER: ViewStyle = {
  flex: 1,
  borderRadius: 0,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}

const SHOW_ANSWER: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.secondary,
}

const ANSWER_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 17,
  letterSpacing: 2,
}

const ANSWERS: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const CARD_COUNT: ViewStyle = {
  alignSelf: "center",
}

const PLACEHOLDER: ViewStyle = {
  width: 24,
}
const CARD_COUNT_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 15,
}

export const ExaminerScreen: FC<StackScreenProps<NavigatorParamList, "examiner">> = observer(
  ({ navigation }) => {
    const { theme } = React.useContext(ThemeContext)

    const { examiner } = useStores()

    const [isRevialed, setIsRevialed] = React.useState(false)

    const goBack = () => {
      navigation.goBack()
    }

    const question = examiner.currentCard
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Header
          left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
          right={<View style={PLACEHOLDER}></View>}
          style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
          titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
          headerTx="examinerScreen.header"
        />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          {question && (
            <View style={CARD_COUNT}>
              <Text
                style={{ ...CARD_COUNT_TEXT, color: theme.colors.primary }}
              >{`Questions left: ${examiner.cards.length}`}</Text>
            </View>
          )}
          {!question ? (
            <View>
              <Text>No questions to learn</Text>
            </View>
          ) : (
            <CardComponent card={question} isRevialed={isRevialed} />
          )}

          {question && (
            <View>
              {isRevialed ? (
                <View style={ANSWERS}>
                  <Button
                    testID="bad-question-answer-button"
                    style={{ ...ANSWER, backgroundColor: theme.colors.background }}
                    textStyle={{ ...ANSWER_TEXT, color: theme.colors.primary }}
                    tx="examinerScreen.answerBad"
                    onPress={() => {
                      setIsRevialed(false)
                      examiner.keepCard()
                    }}
                  />
                  <Button
                    testID="difficult-question-answer-button"
                    style={{ ...ANSWER, backgroundColor: theme.colors.background }}
                    textStyle={{ ...ANSWER_TEXT, color: theme.colors.primary }}
                    tx="examinerScreen.answerDiffucult"
                    onPress={() => {
                      setIsRevialed(false)
                      examiner.releaseCard(AnswerLevel.DIFFICULT)
                    }}
                  />
                  <Button
                    testID="good-question-answer-button"
                    style={{ ...ANSWER, backgroundColor: theme.colors.background }}
                    textStyle={{ ...ANSWER_TEXT, color: theme.colors.primary }}
                    tx="examinerScreen.answerGood"
                    onPress={() => {
                      setIsRevialed(false)
                      examiner.releaseCard(AnswerLevel.GOOD)
                    }}
                  />
                </View>
              ) : (
                <Button
                  testID="show-answer-button"
                  style={{
                    ...SHOW_ANSWER,
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.primary,
                  }}
                  textStyle={{ ...ANSWER_TEXT, color: theme.colors.primary }}
                  tx="examinerScreen.showAnswer"
                  onPress={() => setIsRevialed(true)}
                />
              )}
            </View>
          )}
        </Screen>
      </View>
    )
  },
)
