import * as React from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { Button } from "../../../components"
import { Card } from "../../../models/card/card"
import { color, spacing, typography } from "../../../theme"
import { AnswerLevel } from "../../../types/AnswerLevel"

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.secondary,
}

const BOLD: TextStyle = { fontWeight: "bold" }
const QUESTION_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const ANSWER: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}

const ANSWER_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}

const QUESTION: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  marginTop: 30,
}

interface QuestionProps {
  card: Card
  keepCard: () => void
  releaseCard: (answer: AnswerLevel) => void
}

export function CardComponent({ card, keepCard, releaseCard }: QuestionProps) {
  const [isRevialed, setIsRevialed] = React.useState(false)

  return (
    <View>
      <View style={QUESTION}>
        <View>
          <Text style={QUESTION_TEXT}>{"E: " + card.eFactor}</Text>
        </View>
        <View>
          <Text style={QUESTION_TEXT}>{"Interval: " + card.interval}</Text>
        </View>
        <View>
          <Text style={QUESTION_TEXT}>{"Repetition: " + card.repetitions}</Text>
        </View>

        <Text style={QUESTION_TEXT}>{isRevialed ? card.answer : card.question}</Text>
      </View>

      {isRevialed ? (
        <View>
          <Button
            testID="bad-question-answer-button"
            style={ANSWER}
            textStyle={ANSWER_TEXT}
            tx="examinerScreen.answerBad"
            onPress={() => {
              setIsRevialed(false)
              keepCard()
            }}
          />
          <Button
            testID="difficult-question-answer-button"
            style={ANSWER}
            textStyle={ANSWER_TEXT}
            tx="examinerScreen.answerDiffucult"
            onPress={() => {
              setIsRevialed(false)
              releaseCard(AnswerLevel.DIFFICULT)
            }}
          />
          <Button
            testID="good-question-answer-button"
            style={ANSWER}
            textStyle={ANSWER_TEXT}
            tx="examinerScreen.answerGood"
            onPress={() => {
              setIsRevialed(false)
              releaseCard(AnswerLevel.GOOD)
            }}
          />
          <Button
            testID="excellent-question-answer-button"
            style={ANSWER}
            textStyle={ANSWER_TEXT}
            tx="examinerScreen.answerExcellent"
            onPress={() => {
              setIsRevialed(false)
              releaseCard(AnswerLevel.EXCELLENT)
            }}
          />
        </View>
      ) : (
        <View>
          <Button
            testID="show-answer-button"
            style={ANSWER}
            textStyle={ANSWER_TEXT}
            tx="examinerScreen.showAnswer"
            onPress={() => setIsRevialed(true)}
          />
        </View>
      )}
    </View>
  )
}
