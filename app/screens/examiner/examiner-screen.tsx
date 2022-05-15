import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"
import { getSnapshot } from "mobx-state-tree"
import { CardComponent } from "./components/card"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export const ExaminerScreen: FC<StackScreenProps<NavigatorParamList, "examiner">> = observer(
  ({ navigation }) => {
    const { examiner } = useStores()
    // console.log("cols", getSnapshot(examiner))

    const goBack = () => {
      navigation.goBack()
    }

    const question = examiner.currentCard
    return (
      <View style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="examinerScreen.header"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          {!question ? (
            <View>
              <Text>No questions to learn</Text>
            </View>
          ) : (
            <CardComponent
              card={question}
              keepCard={examiner.keepCard}
              releaseCard={examiner.releaseCard}
            />
          )}
        </Screen>
      </View>
    )
  },
)
