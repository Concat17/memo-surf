import { StackNavigationProp } from "@react-navigation/stack"
import { StorageAccessFramework } from "expo-file-system"
import { FlatList, View, ViewStyle } from "react-native"
import { useStores } from "../../../models"
import { Deck } from "../../../models/deck/deck"
import { NavigatorParamList } from "../../../navigators"
import * as FileSystem from "expo-file-system"

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

const FULL: ViewStyle = { flex: 1 }

const LIST_CONTAINER: ViewStyle = {
  flexDirection: "column",
  flexGrow: 1,
  position: "relative",

  padding: 10,
}

const COLUMN_STYLE: ViewStyle = {
  flexGrow: 1,

  width: "100%",
}

const MENU_STYLE: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
}

const MENU_OPTIONS_STYLE: ViewStyle = {
  padding: 10,
}

interface DeckProps {
  nav: StackNavigationProp<NavigatorParamList, "main">
  decks: Deck[]
}

export const Decks = withMenuContext<DeckProps & MenuContextProps>(
  observer(({ ctx, nav, decks: initDecks }) => {
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

    const exportDeck = async (deck: Deck) => {
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (!permissions.granted) {
        return
      }

      const preparedDeck = {
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

    const createFolder = async () => {
      // const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(
      //   "content://com.android.externalstorage.documents/tree/primary%3AMemoSurf",
      // )

      // if (!permissions.granted) {
      //   return
      // }

      const path = "content://com.android.externalstorage.documents/tree/primary%3AMemoSurf"

      // const path = permissions.directoryUri

      const root = await StorageAccessFramework.readDirectoryAsync(path)
      console.log("dir", root)
      const res = await FileSystem.getInfoAsync(
        "content://com.android.externalstorage.documents/tree/primary%3AMemoSurf/crab.jpg",
      )

      console.log("crab", res)

      // if (!res.exists) {
      //   await FileSystem.makeDirectoryAsync(path)
      // }

      // const uri = await StorageAccessFramework.createFileAsync(
      //   path,
      //   "test1" + ".json",
      //   "application/json",
      // )
    }
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
          <MenuOptions customStyles={{ optionWrapper: MENU_OPTIONS_STYLE }}>
            <MenuOption onSelect={() => goEditorScreen(selectedDeck)} text="Edit cards" />
            <MenuOption onSelect={() => goDeckParamsScreen(selectedDeck)} text="Edit" />
            <MenuOption onSelect={() => exportDeck(selectedDeck)} text="Export" />
            <MenuOption onSelect={() => collection.deleteDeck(selectedDeck)} text="Delete" />
            <MenuOption onSelect={() => createFolder()} text="test" />
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
