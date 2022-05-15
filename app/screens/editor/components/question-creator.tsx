import * as React from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Button } from "../../../components"
import { Deck } from "../../../models/deck/deck"
import { Card, CardModel } from "../../../models/card/card"
import { color, spacing, typography } from "../../../theme"
import { AnswerLevel } from "../../../types/AnswerLevel"
import { v4 } from "uuid"

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.secondary,
}

const BOLD: TextStyle = { fontWeight: "bold" }

const EDITOR: ViewStyle = {
  flexGrow: 1,
}

const EDITOR_CLOSED: ViewStyle = {
  padding: 10,
}

const EDITOR_OPEN: ViewStyle = {
  padding: 10,
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

interface QuestionCreatorProps {
  deck: Deck
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

const createQuestion = (question: string, answer: string) =>
  CardModel.create({
    id: v4(),
    question,
    answer,
  })

export function QuestionCreatorComponent({ deck }: QuestionCreatorProps) {
  const [isRevialed, setIsRevialed] = React.useState(false)

  const [question, setQuestion] = React.useState("")
  const [answer, setAnswer] = React.useState("")

  return (
    <View style={EDITOR}>
      {isRevialed ? (
        <View style={EDITOR_OPEN}>
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
            tx="common.add"
            onPress={() => {
              setIsRevialed(false)
              deck.addQuestion(createQuestion(question, answer))
            }}
          />
        </View>
      ) : (
        <View style={EDITOR_CLOSED}>
          <Button
            testID="next-screen-button"
            style={EDIT}
            textStyle={EDIT_TEXT}
            tx="common.add"
            onPress={() => {
              setIsRevialed(true)
            }}
          />
        </View>
      )}
    </View>
  )
}
