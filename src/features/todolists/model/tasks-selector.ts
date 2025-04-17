import { RootState } from "@/app/store.ts"
import { TaskStateType } from "@/features/todolists/model/tasks-reducer.ts"

//Селектор это функция которая принимает state и достаёт нужный нам объект из этого state.
export const selectTasks = (state: RootState): TaskStateType => state.tasks
