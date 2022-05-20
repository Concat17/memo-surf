import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList, Switch } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../components/icons/ArrowBackIcon"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
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
  textAlign: "center",
  letterSpacing: 1.5,
}

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    const goBack = () => {
      navigation.goBack()
    }

    const { theme, setThemeOption } = React.useContext(ThemeContext)

    const [isEnabled, setIsEnabled] = useState(theme.name === "Light")

    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState)
      setThemeOption((prev) => (prev === "Light" ? "Dark" : "Light"))
    }

    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
            headerTx="editorScreen.header"
            style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
            titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
          />
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </Screen>
      </View>
    )
  },
)
