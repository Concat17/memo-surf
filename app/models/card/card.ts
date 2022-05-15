import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CardModel = types
  .model("Card")
  .props({
    id: types.identifier,
    question: types.string,
    answer: types.string,
    eFactor: types.optional(types.number, 2.5),
    repetitions: types.optional(types.number, 0),
    interval: types.optional(types.number, 0),
  })
  .actions((self) => ({
    edit(question: string, answer: string) {
      self.question = question
      self.answer = answer
    },
  }))

type CardType = Instance<typeof CardModel>
export interface Card extends CardType {}
type CardSnapshotType = SnapshotOut<typeof CardModel>
export interface CardSnapshot extends CardSnapshotType {}
export const createCardDefaultModel = () => types.optional(CardModel, {})
