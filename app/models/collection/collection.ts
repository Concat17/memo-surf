import { cast, destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Deck, DeckModel, DeckRaw } from "../deck/deck"
import { withEnvironment } from "../extensions/with-environment"
import { v4 } from "uuid"

export const CollectionModel = types
  .model("Collection")
  .props({
    decks: types.optional(types.array(DeckModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    getDeckByName(name: string) {
      const deck = self.decks.find((d) => d.name === name)
      return deck
    },
  }))
  .actions((self) => ({
    import: async (deck: DeckRaw) => {
      const filledCards = deck.cards.map((c) => ({
        question: c.question,
        answer: c.answer,
        id: v4(),
        interval: c.interval,
        eFactor: c.eFactor,
        repetitions: c.repetitions,
      }))
      const filledDeck = { id: deck.id, name: deck.name, cards: filledCards }

      self.decks = cast([...self.decks, filledDeck])
    },
    createDeck(name: string) {
      const deck = DeckModel.create({
        id: v4(),
        name,
      })

      self.decks.push(deck)
    },
    deleteDeck: (deck: Deck) => {
      destroy(deck)
    },
  }))

type CollectionType = Instance<typeof CollectionModel>
export interface Collection extends CollectionType {}
type CollectionSnapshotType = SnapshotOut<typeof CollectionModel>
export interface CollectionStoreSnapshot extends CollectionSnapshotType {}
export const createCollectionDefaultModel = () => types.optional(CollectionModel, {})
