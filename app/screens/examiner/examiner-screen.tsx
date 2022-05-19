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
import { ArrowBackIcon } from "../../icons/icons/ArrowBackIcon"
import { ThemeContext } from "../../app"

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

export const ExaminerScreen: FC<StackScreenProps<NavigatorParamList, "examiner">> = observer(
  ({ navigation }) => {
    const { theme } = React.useContext(ThemeContext)
    const { examiner } = useStores()
    // console.log("cols", getSnapshot(examiner))

    const goBack = () => {
      navigation.goBack()
    }

    const question = examiner.currentCard
    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
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
