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

interface QuestionProps {
  question: Card
  onCardPress: () => void
}

export function QuestionEditorComponent({ question, onCardPress }: QuestionProps) {
  return (
    <View style={EDITOR}>
      <View style={EDITOR_CLOSED}>
        <Text style={EDIT_TEXT} onPress={onCardPress}>
          {question.question}
        </Text>
      </View>
    </View>
  )
}
