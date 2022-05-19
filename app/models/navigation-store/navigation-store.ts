import { types, onSnapshot, getRoot } from "mobx-state-tree"
import { Card, CardModel } from "../card/card"
import { Deck, DeckModel } from "../deck/deck"

export const NavigationStore = types
  .model("NavigationStore", {
    deckEditorScreenParams: types.map(
      types.model("DeckEditorScreenParams", {
        deck: types.maybe(types.late(() => types.reference(DeckModel))),
      }),
    ),
    cardEditorScreenParams: types.map(
      types.model("CardEditorScreenParams", {
        card: types.maybe(types.late(() => types.reference(CardModel))),
      }),
    ),
  })
  .actions((self) => ({
    setDeckEditorScreenParams(deck: Deck) {
      console.log("setting")
      self.deckEditorScreenParams.set("DeckEditorScreenParams", { deck })
    },
    setCadrEditorScreenParams(card: Card) {
      console.log("setting")
      self.cardEditorScreenParams.set("CardEditorScreenParams", { card })
    },
  }))
