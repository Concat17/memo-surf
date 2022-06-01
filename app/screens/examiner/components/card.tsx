import * as React from "react"
import { Text, TextStyle, View, ViewStyle, Image, ImageStyle } from "react-native"
import { Button } from "../../../components"
import { Card } from "../../../models/card/card"
import { color, spacing, typography } from "../../../theme"
import { AnswerLevel } from "../../../types/AnswerLevel"
import * as ImagePicker from "expo-image-picker"
import { DevContext, ThemeContext } from "../../../app"

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

  textAlign: "center",
}

const QUESTION_INFO: TextStyle = {
  ...TEXT,
  color: "red",
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
  const { isDevMode } = React.useContext(DevContext)
  const { theme } = React.useContext(ThemeContext)
  return (
    <View style={FULL}>
      <View style={QUESTION}>
        {isDevMode && (
          <>
            <View>
              <Text style={QUESTION_INFO}>{"E: " + card.eFactor}</Text>
            </View>
            <View>
              <Text style={QUESTION_INFO}>{"Interval: " + card.interval}</Text>
            </View>
            <View>
              <Text style={QUESTION_INFO}>{"Repetition: " + card.repetitions}</Text>
            </View>
          </>
        )}

        <Text style={{ ...QUESTION_TEXT, color: theme.colors.primary }}>
          {isRevialed ? card.answer : card.question}
        </Text>
        {card.imagePath ? <Image source={{ uri: card.imagePath }} style={IMAGE} /> : <View />}
      </View>
    </View>
  )
}
