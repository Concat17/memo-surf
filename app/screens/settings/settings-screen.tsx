import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, FlatList, Switch, TextInput } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Screen, Text, GradientBackground, Header, Button } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { DevContext, ThemeContext } from "../../app"
import { ArrowBackIcon } from "../../components/icons/ArrowBackIcon"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,

  padding: 10,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
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

const SETTINGS_BLOCK: ViewStyle = {
  marginBottom: 10,
}

const BLOCK_NAME: TextStyle = {
  ...BOLD,
  fontSize: 17,
}

const SETTING_NAME: TextStyle = {}

const SWITCH_SETTING: ViewStyle = {
  display: "flex",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const EDIT_INPUT: ViewStyle = {
  ...TEXT,
  padding: 10,
  borderWidth: 1,
  borderRadius: 3,
  borderStyle: "solid",
  borderColor: "red",

  marginBottom: 15,
}

export const SettingsScreen: FC<StackScreenProps<NavigatorParamList, "settings">> = observer(
  ({ navigation }) => {
    const goBack = () => {
      navigation.goBack()
    }
    const { examiner } = useStores()

    const { theme, setThemeOption } = React.useContext(ThemeContext)
    // const { isDevMode, setIsDevMode } = React.useContext(DevContext)

    const [isEnabled, setIsEnabled] = useState(theme.name === "Light")

    const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState)
      setThemeOption((prev) => (prev === "Light" ? "Dark" : "Light"))
    }

    return (
      <View style={FULL}>
        <GradientBackground colors={[theme.colors.background, theme.colors.background]} />
        <Header
          left={<ArrowBackIcon onPress={goBack} fill={theme.colors.primary} />}
          headerTx="settingsScreen.header"
          style={{ ...HEADER, backgroundColor: theme.colors.secondary }}
          titleStyle={{ ...HEADER_TITLE, color: theme.colors.primary }}
        />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <View style={SETTINGS_BLOCK}>
            <Text
              style={{ ...BLOCK_NAME, color: theme.colors.primary }}
              tx="settingsScreen.display"
            />

            <View style={SWITCH_SETTING}>
              <Text
                style={{ ...SETTING_NAME, color: theme.colors.primary }}
                tx="settingsScreen.switchTheme"
              />
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <View style={SETTINGS_BLOCK}>
            <Text
              style={{ ...BLOCK_NAME, color: theme.colors.primary }}
              tx="settingsScreen.learn"
            />

            <View style={SWITCH_SETTING}>
              <Text
                style={{ ...SETTING_NAME, color: theme.colors.primary }}
                tx="settingsScreen.cardPerLesson"
              />
              <TextInput
                style={{ ...EDIT_INPUT, borderColor: theme.colors.primary }}
                defaultValue={examiner.learnCount.toString()}
                keyboardType="number-pad"
                onChangeText={(v) => {
                  const cardCount = parseInt(v)
                  if (!isNaN(cardCount)) examiner.changeLearnCount(parseInt(v))
                }}
              />
            </View>

            {/* <View style={SETTINGS_BLOCK}>
              <Text
                style={{ ...BLOCK_NAME, color: theme.colors.primary }}
                tx="settingsScreen.special"
              />

              <View style={SWITCH_SETTING}>
                <Text
                  style={{ ...SETTING_NAME, color: theme.colors.primary }}
                  tx="settingsScreen.devMode"
                />
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={() => setIsDevMode(!isDevMode)}
                  value={isDevMode}
                />
              </View>
            </View> */}
          </View>
        </Screen>
      </View>
    )
  },
)
