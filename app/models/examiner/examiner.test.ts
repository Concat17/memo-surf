import { AnswerLevel } from "../../types/AnswerLevel"
import { types, Instance, getSnapshot } from "mobx-state-tree"
import { DeckModel } from "../deck/deck"
// import { RootStore, RootStoreModel } from "../root-store/root-store"
import { ExaminerModel } from "./examiner"
// import { v4 } from "uuid"
// // import { QuestionModel } from "../question/question"
// import { deck, DeckModel } from "../deck/deck"
// import { RootStoreModel } from "../root-store/root-store"

const RootStoreTestModel = types.model("RootStoreTest").props({
  examiner: types.optional(ExaminerModel, {}),
  collections: types.optional(types.array(DeckModel), [
    {
      name: "Test",
      questions: [
        {
          id: "1",
          question: "1Q",
          answer: "1A",
          knowledge: 0,
        },
        {
          id: "2",
          question: "2Q",
          answer: "2A",
          knowledge: 0,
        },
      ],
    },
  ] as any),
})

interface RootStore extends Instance<typeof RootStoreTestModel> {}

let root: RootStore

beforeEach(() => {
  root = RootStoreTestModel.create({})
  root.examiner.setDeck(root.collections[0])
  root.examiner.pickCards()
  // examiner.setDeck(deck)
  // examiner.setDeck(deck)
  // console.log("col", examiner.deck)
  // examiner.pickQuestions()
})

test("can be created", () => {
  expect(root.examiner).toBeTruthy()
})

test("can get current question", () => {
  const q = root.examiner.currentCard

  expect(q).toBeTruthy()
})

test("can keep current question", () => {
  root.examiner.keepCard()

  expect(root.examiner.cards.length).toBe(root.examiner.cards.length)
})

test("can release current question", () => {
  const initLength = root.examiner.cards.length
  root.examiner.releaseCard(AnswerLevel.GOOD)

  console.log("collect", getSnapshot(root.collections[0]))
  console.log("examiner", getSnapshot(root.examiner))

  expect(root.examiner.cards.length).toBe(initLength - 1)
  expect(root.collections[0].cards[0].knowledge).toBe(1.2)
})

// test("can chage coef question", () => {
//   examiner.releaseQuestion(AnswerLevel.GOOD)

//   expect(questions[0].knowledge).toBe(1.2)
// })
