import { StackNavigationProp } from "@react-navigation/stack"
import {
  documentDirectory,
  getContentUriAsync,
  getInfoAsync,
  StorageAccessFramework,
} from "expo-file-system"
import { Alert, FlatList, View, ViewStyle } from "react-native"
import { useStores } from "../../../models"
import { Deck } from "../../../models/deck/deck"
import { NavigatorParamList } from "../../../navigators"
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuContextProps,
  MenuTrigger,
  withMenuContext,
} from "react-native-popup-menu"
import { DeckComponent } from "./deck"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useState } from "react"
import { ThemeContext } from "../../../app"

const FULL: ViewStyle = { flex: 1 }

const LIST_CONTAINER: ViewStyle = {
  flexDirection: "column",
  flexGrow: 1,
  position: "relative",

  padding: 10,
}

const MENU_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  alignItems: "center",
  padding: 10,
}

const MENU_OPTIONS_STYLE: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
}

const MENU_CONTAINER_STYLE: ViewStyle = {
  borderStyle: "solid",
  borderWidth: 1,
}

interface DeckProps {
  nav: StackNavigationProp<NavigatorParamList, "main">
  decks: Deck[]
}

export const Decks = withMenuContext<DeckProps & MenuContextProps>(
  observer(({ ctx, nav, decks: initDecks }) => {
    const { theme } = React.useContext(ThemeContext)
    const { collection, examiner } = useStores()
    const [decks, setDecks] = useState(initDecks ?? [])
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)
    const goExaminerScreen = useCallback(() => nav.navigate("examiner"), [nav])
    const startLesson = useCallback(
      (deck) => {
        examiner.setDeck(deck)
        examiner.pickCards()
        goExaminerScreen()
      },
      [examiner, goExaminerScreen],
    )

    useEffect(() => {
      nav.addListener("focus", () => {
        if (collection?.decks) {
          console.log("col", collection)
          setDecks([...collection.decks])
        }
      })
    }, [collection, nav])

    const exportDeck = async (deck: Deck, saveProgress: boolean) => {
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (!permissions.granted) {
        return
      }

      const preparedDeck = saveProgress
        ? {
            ...deck,
            cards: deck.cards.map((c) => ({ ...c })),
          }
        : {
            ...deck,
            cards: deck.cards.map((c) => ({ ...c, interval: 0, eFactor: 0, repetitions: 0 })),
          }

      const uri = await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        deck.name + ".json",
        "application/json",
      )

      await FileSystem.writeAsStringAsync(uri, JSON.stringify(preparedDeck))
    }

    const showExportOptions = (deck: Deck) =>
      Alert.alert(
        "How do you want export deck?",
        "I can save your progress or export clear deck.",
        [
          {
            text: "Export with progress",
            onPress: () => {
              exportDeck(deck, true)
            },
          },
          {
            text: "Export without progress",
            onPress: () => {
              exportDeck(deck, false)
            },
          },
        ],
        {
          cancelable: true,
        },
      )

    const goDeckParamsScreen = useCallback(
      (deck: Deck) => nav.navigate("deckParamsEditor", { deck }),
      [nav],
    )

    const goEditorScreen = useCallback(
      (deck: Deck) => {
        nav.navigate("deckEditor", { deck })
      },
      [nav],
    )
    return (
      <View style={FULL}>
        <Menu name="deck-options" style={MENU_STYLE}>
          <MenuTrigger />
          <MenuOptions
            optionsContainerStyle={{ ...MENU_CONTAINER_STYLE, borderColor: theme.colors.primary }}
            customStyles={{
              optionWrapper: {
                ...MENU_OPTIONS_STYLE,
                backgroundColor: theme.colors.background,
              },
              optionText: { color: theme.colors.primary },
            }}
          >
            <MenuOption onSelect={() => goEditorScreen(selectedDeck)} text="Cards" />
            <MenuOption onSelect={() => goDeckParamsScreen(selectedDeck)} text="Edit" />
            <MenuOption onSelect={() => showExportOptions(selectedDeck)} text="Export" />
            <MenuOption onSelect={() => collection.deleteDeck(selectedDeck)} text="Delete" />
          </MenuOptions>
        </Menu>
        <FlatList
          contentContainerStyle={LIST_CONTAINER}
          keyExtractor={(collection) => String(collection.name)}
          data={[...decks]}
          renderItem={({ item }) => (
            <DeckComponent
              onPress={() => startLesson(item)}
              // eslint-disable-next-line no-sequences
              onLongPress={() => (setSelectedDeck(item), ctx.menuActions.openMenu("deck-options"))}
              deck={item}
              nav={nav}
            />
          )}
        />
      </View>
    )
  }),
)
