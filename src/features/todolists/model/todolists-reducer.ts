import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"

export type FilterType = "All" | "Active" | "Completed"
export type toDoListType = {
  id: string
  title: string
  filter: FilterType
}

//RTK синтаксис, создаем AC через метод createAction
//Запись в дженериках, восоздаёт тот же объект что и обычный AC, payload {type и прочее}
export const DeleteTodolistAC = createAction<{ id: string }>("todolists/DeleteTodolist")
export const changeFilterAC = createAction<{ filter: FilterType; id: string }>("todolists/CHANGE-FILTER")
export const changeToDoListTitleAC = createAction<{
  toDoListId: string
  title: string
}>("todolists/CHANGE-TODOLIST-TITLE")

//Payload можно создавать не только через дженерики, но и передав колбэк вторым аргументом в метод createAction и return payload
//Если внутри action ничего не создается, то используем обычный синтаксис. Как ниже, только при манипуляциях (если что то внутри создается) с payload.
//nanoid() встроенная утилита, для генерации id.
export const AddTodolistAC = createAction("todolists/ADD-TODOLIST", (title: string) => {
  return { payload: { title: title, id: nanoid() } }
})

const initialstate: Array<toDoListType> = []

//С помощью createReducer создаём reducer
//Первым аргументом принимает инициализационный state и вторым аргументом callback с переданным в него builder и при помощи метода addCase и переданных в него (1.Action 2.Callback c переданными в него state и action) изменяем стейт.
//В RTK(Redux ToolKit) есть встроенная библиотека immer JS, превращающий мутабельный код в иммутабельный.
// В документации про immer прописано, какие методы предпочтительнее для изменения state в Redux
export const todolistsReducer = createReducer(initialstate, (builder) => {
  builder
    .addCase(DeleteTodolistAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    })
    .addCase(AddTodolistAC, (state, action) => {
      state.push({ ...action.payload, filter: "All" })
    })
    .addCase(changeToDoListTitleAC, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.toDoListId)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
    .addCase(changeFilterAC, (state, action) => {
      const { filter, id } = action.payload
      const index = state.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        state[index].filter = filter
      }
    })
})
