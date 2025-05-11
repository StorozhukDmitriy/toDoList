import { Todolist, todolistsApi } from "@/features/todolists/api"
import { createAppSlice } from "@/common/utils"
import { changeErrorAC, changeStatusModeAC } from "@/app/app-slice.ts"
import { RequestStatus } from "@/common/types"
import { ResultCode } from "@/common/enums"
import { handleServerNetworkError } from "@/common/utils/handleServerNetworkError.ts"
import { handleServerAppError } from "@/common/utils/handleServerAppError.ts"

export type FilterType = "All" | "Active" | "Completed"

export type DomainTodolist = Todolist & {
  filter: FilterType
  entityStatus: RequestStatus
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as Array<DomainTodolist>,
  reducers: (create) => ({
    //actions (синхронное действие)
    changeFilterAC: create.reducer<{ filter: FilterType; id: string }>((state, action) => {
      const { filter, id } = action.payload
      const index = state.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        state[index].filter = filter
      }
    }),
    //Для работы с disable добавили в таску новое свойство и создав AC, диспатчим его из кейса с удалением тудулиста.
    changeEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
      const { id, entityStatus } = action.payload
      const index = state.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        state[index].entityStatus = entityStatus
      }
    }),

    getTodolistsTC: create.asyncThunk(
      async (_arg, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          const res = await todolistsApi.getTodolist()
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return { todolists: res.data }
        } catch (error: any) {
          debugger
          dispatch(changeStatusModeAC({ status: "failed" }))
          dispatch(changeErrorAC({ error: error.message }))
          return rejectWithValue(error)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload?.todolists.forEach((el) => {
            state.unshift({ ...el, filter: "All", entityStatus: "idle" })
          })
        },
      },
    ),
    changeToDoListTitleTC: create.asyncThunk(
      async (args: { id: string; title: string }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
          thunkAPI.dispatch(changeStatusModeAC({ status: "loading" }))
          await todolistsApi.changeTodolistTitle(args)
          thunkAPI.dispatch(changeStatusModeAC({ status: "succeeded" }))
          return args
        } catch (error) {
          return rejectWithValue(null)
        } finally {
          thunkAPI.dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((todo) => todo.id === action.payload?.id)
          if (index !== -1) {
            if (action.payload) state[index].title = action.payload.title
          }
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (args: string, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(args)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(changeStatusModeAC({ status: "succeeded" }))
            return res.data.data.item
          }
          handleServerAppError(res.data, dispatch)
          return rejectWithValue(null)
        } catch (error: any) {
          debugger
          // Унесли в утилитную функцию всю нашу логику по обработке catch и в функции сделали проверку на форму ошибку от axios.
          handleServerNetworkError(dispatch, error)
          // dispatch(changeErrorAC({ error: error.message }))
          // dispatch(changeStatusModeAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          if (action.payload) {
            const newTodolist: DomainTodolist = {
              title: action.payload.title,
              id: action.payload.id,
              filter: "All",
              entityStatus: "idle",
              addedDate: action.payload.addedDate,
              order: action.payload.order,
            }
            state.push(newTodolist)
          }
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (args: { id: string }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI
        try {
          dispatch(changeStatusModeAC({ status: "loading" }))
          dispatch(changeEntityStatusAC({ id: args.id, entityStatus: "loading" }))
          await todolistsApi.deleteTodolist(args.id)
          dispatch(changeEntityStatusAC({ id: args.id, entityStatus: "succeeded" }))
          dispatch(changeStatusModeAC({ status: "succeeded" }))
          return args
        } catch (error) {
          dispatch(changeStatusModeAC({ status: "failed" }))
          dispatch(changeEntityStatusAC({ id: args.id, entityStatus: "failed" }))
          return rejectWithValue(null)
        } finally {
          dispatch(changeStatusModeAC({ status: "idle" }))
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((arr) => arr.id === action.payload?.id)
          if (index !== -1) state.splice(index, 1)
        },
      },
    ),
  }),
  selectors: {
    selectToDoLists: (state) => state,
  },
})

//Создаём функцию Thunk - функция служащая для side эффектов в reducer.
// Создаётся при помощи функции createAsyncThunk, нейминг от action, только на конце TC.
// Первый аргументом принимает префикс, состоящий из названия слайса + название санки.
// Второй аргумент callback функция принимающая в себя 2 аргумента в параметрах arg и thunkApi
// Получаем dispatch из thunkApi и диспатчим значения полученные из запроса к api
// Для того что бы показать что один из аргументов не используется, применяется нижнее подчеркивание.(согласна соглашению )

//2 BLL делаем запрос к DAL,вызывая метод getTodolist объекта todolistsApi.
//В примере с тудулистами, санки лежат отдельно slice, с тасками уже более свежий синтаксис.

//Примеры санок на прошлом синтаксисе
// export const setTodolistsTC = createAsyncThunk(
//   `${todolistsSlice.name}/setTodolistsTC`,
//   async (_arg, { rejectWithValue }) => {
//     // const { dispatch } = thunkAPI
//     try {
//       //4 Обрабатываем вернувшийся промис и диспатчим с санок в (todolist reducer), диспатчим передавая заранее созданный AC.
//       const res = await todolistsApi.getTodolist()
//       return { todolists: res.data }
//       // dispatch(setTodolistsAC({ todolists: res.data }))
//     } catch (error) {
//       //в случае возникновения ошибки,
//       rejectWithValue(null)
//     }
//   },
// )

// export const changeToDoListTitleTC = createAsyncThunk(
//   `${todolistsSlice.name}/changeToDoListTitleTC`,
//   async (args: { id: string; title: string }, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       await todolistsApi.changeTodolistTitle(args)
//       return args
//     } catch (error) {
//       rejectWithValue(null)
//     }
//   },
// )

// export const createTodolistTC = createAsyncThunk(
//   `${todolistsSlice.name}/createTodolistTC`,
//   async (args: string, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       const res = await todolistsApi.createTodolist(args)
//       return res.data.data.item
//     } catch (error) {
//       rejectWithValue(null)
//     }
//   },
// )

// export const deleteTodolistTC = createAsyncThunk(
//   `${todolistsSlice.name}/deleteTodolistTC`,
//
//   async (args: { id: string }, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI
//     try {
//       await todolistsApi.deleteTodolist(args.id)
//       return args
//     } catch (error) {
//       rejectWithValue(null)
//     }
//   },
// )

export const { selectToDoLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
export const {
  changeFilterAC,
  getTodolistsTC,
  changeToDoListTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  changeEntityStatusAC,
} = todolistsSlice.actions
