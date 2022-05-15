import { CardModel } from "../card/card"
import { Deck, DeckModel } from "./deck"
import { v4 } from "uuid"

let deck: Deck

beforeEach(() => {
  deck = DeckModel.create({
    name: "Test",
  })
})

test("can be created", () => {
  expect(deck).toBeTruthy()
})

test("can see questions count", () => {
  expect(deck.numberOfCards).toBe(0)
})

test("can add and delete question", () => {
  const question = CardModel.create({
    id: v4(),
    question: "What is the best animal?",
    answer: "Crab",
  })

  deck.addQuestion(question)
  expect(deck.numberOfCards).toBe(1)

  deck.deleteQuestion(question)
  expect(deck.numberOfCards).toBe(0)
})
