import { CardModel } from "./card"
import { v4 } from "uuid"

test("can be created", () => {
  const instance = CardModel.create({
    id: v4(),
    question: "What is the best animal?",
    answer: "Crab",
  })

  expect(instance).toBeTruthy()
})

test("can be edited", () => {
  const instance = CardModel.create({
    id: v4(),
    question: "What is the best animal?",
    answer: "Crab",
  })

  instance.edit("Q", "A")

  expect(instance.question).toBe("Q")
  expect(instance.answer).toBe("A")
})
