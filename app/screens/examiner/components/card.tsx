import * as React from "react"
import { Text, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { Button } from "../../../components"
import { Card } from "../../../models/card/card"
import { color, spacing, typography } from "../../../theme"
import { AnswerLevel } from "../../../types/AnswerLevel"
import * as ImagePicker from "expo-image-picker"

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

const IMAGE: ImageStyle = {
  width: 200,
  height: 200,
  marginTop: 20,
  alignSelf: "center",
  justifyContent: "center",
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
        {/* <View>
          <Text style={QUESTION_TEXT}>{"E: " + card.eFactor}</Text>
        </View>
        <View>
          <Text style={QUESTION_TEXT}>{"Interval: " + card.interval}</Text>
        </View>

        <View>
          <Text style={QUESTION_TEXT}>{"Repetition: " + card.repetitions}</Text>
        </View> */}
        {/* // eslint-disable-next-line react-native/no-inline-styles */}
        <Text style={QUESTION_TEXT}>{isRevialed ? card.answer : card.question}</Text>
        {card.imagePath ? <Image source={{ uri: card.imagePath }} style={IMAGE} /> : <View />}
      </View>
    </View>
  )
}
