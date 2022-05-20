import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { MainScreen } from "../screens/main/main-screen"
import { ExaminerScreen } from "../screens/examiner"
import { Deck } from "../models/deck/deck"
import { SettingsScreen } from "../screens/settings/settings-screen"
import { DeckEditorScreen } from "../screens/deck-editor/deck-editor-screen"
import { Card } from "../models/card/card"
import { CardEditorScreen } from "../screens/card-editor/card-editor-screen"

export type NavigatorParamList = {
  main: undefined
  examiner: undefined
  settings: undefined
  deckEditor: { deck: Deck }
  cardEditor: { card?: Card | null; deckName: string }
}

const Stack = createNativeStackNavigator<NavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="main"
    >
      <Stack.Screen name="examiner" component={ExaminerScreen} />
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="deckEditor" component={DeckEditorScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="cardEditor" component={CardEditorScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
