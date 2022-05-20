import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { AnswerLevel } from "../../types/AnswerLevel"

import { Deck, DeckModel } from "../deck/deck"
import { CardModel } from "../card/card"

export const ExaminerModel = types
  .model("Examiner")
  .props({
    deck: types.maybe(types.late(() => types.reference(DeckModel))),
    cards: types.array(types.late(() => types.reference(CardModel))),
    currentCardIndex: types.optional(types.number, 0),
    round: types.optional(types.number, 1),
    learnCount: types.optional(types.number, 10),
  })
  .views((self) => ({
    get currentCard() {
      if (self.cards.length === 0) return null
      return self.cards[self.currentCardIndex]
    },
  }))
  .actions((self) => ({
    setDeck(deck: Deck) {
      self.deck = undefined
      self.cards = cast([])
      self.currentCardIndex = 0
      self.round = 0

      self.deck = deck
    },
    pickCards() {
      const total =
        self.deck.cards.length < self.learnCount ? self.deck.cards.length : self.learnCount
      let freshCount = Math.ceil((total * 20) / 100)
      const hardCount = Math.ceil((total * 60) / 100)
      let mediumCount = total - freshCount - hardCount

      console.log("fresh count: ", freshCount)
      console.log("hard count: ", hardCount)
      console.log("medium count: ", mediumCount)

      const cards = [...self.deck.cards]

      const intervalOne = cards.filter((c) => c.interval === 1)
      const intervalZero = cards.filter((c) => c.interval === 0)
      const intervalOther = cards.filter((c) => c.interval > 1)

      if (intervalOne.length < hardCount) {
        freshCount += hardCount - intervalOne.length
      }

      if (intervalZero.length < freshCount) {
        mediumCount += freshCount - intervalZero.length
      }

      const hard = intervalOne.slice(0, hardCount)

      const fresh = intervalZero.slice(0, freshCount)

      const learned = intervalOther.slice(0, mediumCount)

      const pickedQuestions = [...new Set([...hard, ...learned, ...fresh])]

      self.cards.push(...pickedQuestions.map((q) => q.id))
    },
    keepCard() {
      if (self.currentCardIndex === self.cards.length - 1) {
        self.currentCardIndex = 0
        self.round++
      } else {
        self.currentCardIndex++
      }
    },
    releaseCard(answer: AnswerLevel) {
      let repetitions = self.currentCard.repetitions
      let eFactor = self.currentCard.eFactor
      let interval = self.currentCard.interval
      let quality = 0

      switch (answer) {
        case AnswerLevel.DIFFICULT:
          quality = 1
          break
        case AnswerLevel.GOOD:
          quality = 2
          break
      }

      // easiness factor
      eFactor = Math.max(1.3, eFactor + 0.1 - (3.0 - quality) * (0.08 + (3.0 - quality) * 0.02))

      // repetitions
      if (quality < 2) {
        repetitions = 0
      } else {
        repetitions += 1
      }

      // interval
      if (repetitions <= 1) {
        interval = 1
      } else if (repetitions === 2) {
        interval = 6
      } else {
        interval = Math.round(interval * eFactor)
      }

      self.deck.changeCardStats(self.currentCard, { eFactor, interval, repetitions })

      self.cards.splice(self.currentCardIndex, self.currentCardIndex + 1)
      if (self.currentCardIndex >= self.cards.length) {
        self.currentCardIndex = 0
        self.round++
      }
    },
    clear() {
      self.deck = undefined
      self.cards = cast([])
      self.currentCardIndex = 0
      self.round = 0
    },
  }))

type ExaminerType = Instance<typeof ExaminerModel>
export interface Examiner extends ExaminerType {}
type ExaminerSnapshotType = SnapshotOut<typeof ExaminerModel>
export interface ExaminerSnapshot extends ExaminerSnapshotType {}
export const createExaminerDefaultModel = () => types.optional(ExaminerModel, {})
