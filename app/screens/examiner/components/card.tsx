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
  fontSize: 20,
  letterSpacing: 2,
}

const QUESTION: ViewStyle = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignSelf: "center",
  marginTop: 30,
}

const FULL: ViewStyle = { flex: 1, flexGrow: 1, justifyContent: "space-between" }

interface QuestionProps {
  card: Card
  isRevialed: boolean
}

export function CardComponent({ card, isRevialed }: QuestionProps) {
  return (
    <View style={FULL}>
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
    </View>
  )
}
