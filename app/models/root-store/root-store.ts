import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { CollectionModel } from "../collection/collection"
import { ExaminerModel } from "../examiner/examiner"
import { NavigationStore } from "../navigation-store/navigation-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  examiner: types.optional(ExaminerModel, {}),
  navigationStore: types.optional(NavigationStore, {}),
  collection: types.optional(CollectionModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
