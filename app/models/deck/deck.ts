import { destroy, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { Card, CardModel } from "../card/card"

type CardStats = {
  eFactor: number
  repetitions: number
  interval: number
}

export const DeckModel = types
  .model("Deck")
  .props({
    name: types.identifier,
    cards: types.optional(types.array(CardModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    getCard: (): Card | null => {
      if (self.cards.length === 0) {
        return null
      }

      return self.cards[0]
    },
    addQuestion: (card: Card) => {
      self.cards.push(card)
    },
    deleteQuestion: (card: Card) => {
      destroy(card)
    },
    changeCardStats(card: Card, { eFactor, interval, repetitions }: CardStats) {
      card.eFactor = eFactor
      card.interval = interval
      card.repetitions = repetitions
    },
  }))
  .views((self) => ({
    get numberOfCards() {
      return self.cards.length
    },
    getCardById(id: string) {
      return self.cards.find((q) => q.id === id)
    },
  }))

type DeckType = Instance<typeof DeckModel>
export interface Deck extends DeckType {}
type DeckSnapshotType = SnapshotOut<typeof DeckModel>

export interface DeckStoreSnapshot extends DeckSnapshotType {}
export const createDeckDefaultModel = () => types.optional(DeckModel, {})

export type DeckRaw = {
  name: string
  cards: Array<{ question: string; answer: string; interval?: number }>
}
