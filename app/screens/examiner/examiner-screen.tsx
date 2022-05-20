import React, { FC } from "react"
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
import { ThemeContext } from "../../app"
import { AnswerLevel } from "../../types/AnswerLevel"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  position: "relative",
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
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
            headerTx="examinerScreen.header"
          />
          {!question ? (
            <View>
              <Text>No questions to learn</Text>
            </View>
          ) : (
            <CardComponent card={question} isRevialed={isRevialed} />
          )}

          {question && isRevialed ? (
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
        </Screen>
      </View>
    )
  },
)
