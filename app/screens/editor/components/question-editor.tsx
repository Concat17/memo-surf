import * as React from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Button } from "../../../components"
import { Card } from "../../../models/card/card"
import { color, spacing, typography } from "../../../theme"
import { AnswerLevel } from "../../../types/AnswerLevel"

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

interface QuestionProps {
  question: Card
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

export function QuestionEditorComponent({ question: initQuestion }: QuestionProps) {
  const [isRevialed, setIsRevialed] = React.useState(false)

  const [question, setQuestion] = React.useState(initQuestion.question)
  const [answer, setAnswer] = React.useState(initQuestion.answer)

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
            tx="common.save"
            onPress={() => {
              setIsRevialed(false)
              initQuestion.edit(question, answer)
            }}
          />
        </View>
      ) : (
        <View style={EDITOR_CLOSED}>
          <Text style={EDIT_TEXT} onPress={() => setIsRevialed(true)}>
            {question}
          </Text>
        </View>
      )}
    </View>
  )
}
