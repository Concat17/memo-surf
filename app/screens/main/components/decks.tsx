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
import * as MediaLibrary from "expo-media-library"
import React, { FC, useCallback, useEffect, useState } from "react"
import { ThemeContext } from "../../../app"

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
  // bottom: 0,
  // justifyContent: "center",
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

    // 1 gather files
    // 2 zip files
    // 3 move zip into dest folder

    const createFolder = async (deck: Deck) => {
      // const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync()
      // if (!mediaLibraryPermissions.granted) {
      //   return
      // }
      // const asset = await MediaLibrary.createAssetAsync(
      //   "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540concat17%252FMemoSurf/ImagePicker/e2f608ac-61f8-46fc-8c1c-bd3adcefebc5.jpg",
      // )
      // await MediaLibrary.createAlbumAsync("KekLol", asset, false)

      const album = await MediaLibrary.getAlbumAsync("KekLol")
      console.log("album", album)
      console.log("loc", album.locationNames)
      const assets = await MediaLibrary.getAssetsAsync({ album: album.id })
      console.log("assets", assets)
      // if (assets.length) {
      //   await MediaLibrary.addAssetsToAlbumAsync(assets, newAlbum, false);
      // }
    }

    const createFolderExternal = async (deck: Deck) => {
      const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (!permissions.granted) {
        return
      }

      const grantedPath = permissions.directoryUri
      console.log("permissions granted", grantedPath)

      const path = await StorageAccessFramework.makeDirectoryAsync(grantedPath, deck.name)
      console.log("folder created", path)

      const preparedDeck = {
        ...deck,
        cards: deck.cards.map((c) => ({ ...c, interval: 0, eFactor: 0, repetitions: 0 })),
      }

      const uri = await StorageAccessFramework.createFileAsync(
        path,
        deck.name + ".json",
        "application/json",
      )

      await FileSystem.writeAsStringAsync(uri, JSON.stringify(preparedDeck))
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
            {/* <MenuOption onSelect={() => exportDeck(selectedDeck)} text="Export" /> */}
            <MenuOption onSelect={() => collection.deleteDeck(selectedDeck)} text="Delete" />
            {/* <MenuOption onSelect={() => createFolder(selectedDeck)} text="test" /> */}
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
