import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { Todolist, todolistsApi } from "@/features/todolists/api"

export type FilterType = "All" | "Active" | "Completed"

//Тип DomainTodolist этот тип у нас внутри ui, с сервера мы получаем Todolist[] и из слайса уже выходит DomainTodolist
export type DomainTodolist = Todolist & {
  filter: FilterType
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Array<DomainTodolist>, //Завести как правило, плохо держать данные в массиве, правильнее использовать объект, так как данные вечно расширяются, а объект хорошо масштабируется.
  //Для получения todolists с сервера и записи их в стейт redux,мы создали setTodolistsAC ждущий в качестве payload массив тудулистов, и получив их запушили в стейт, добавив в типизацию filter, так как у нас в тудулистах с сервера нет этого свойства.
  //Запрос к api произвели в компоненте тудулист.
  reducers: (create) => ({
    // setTodolistsAC больше не требуется, поскольку все эти действия осуществляем в extraReducer, передавая из санки массив с тасками, которые мы получали при запросе на сервер.

    // setTodolistsAC: create.reducer<{ todolists: Array<Todolist> }>((state, action) => {
    //   debugger
    //   // console.log(state)
    //   // return action.payload.todolists
    //   //1
    //   //Если у нас происходит замена всего стейта, просто указать state = newState не выйдет (immer js ждёт мутабельных изменений), только через мутабельные методы массива (foreach), если используем иммутабельный map, то нужен return нового стейта.
    //   action.payload.todolists.forEach((el) => {
    //     state.push({ ...el, filter: "All" })
    //   })
    // }),
    DeleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)

      if (index !== -1) state.splice(index, 1)
    }),
    //changeFilterAC не вызывает запрос на сервер, а несёт локальный характер, так что его не переносим в extraReducer.
    changeFilterAC: create.reducer<{ filter: FilterType; id: string }>((state, action) => {
      const { filter, id } = action.payload
      const index = state.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        state[index].filter = filter
      }
    }),
    //для реализации каких либо side эффектов, использовать preparedReducer, принимает 2 callback первый формируем payload (это в том случаем если мы что-то генерируем, в этом callback в параметрах приходят переменные которые мы поднимаем из функции в компоненте где диспатчим, второй callback формируем как обычно (state,action) => изменения в state (Мутабельно) Под капотом в Redux идёт Immer js, транспилирующий код из мутабельного в иммутабельного.
    AddTodolistAC: create.preparedReducer(
      (title: string) => {
        return { payload: { title: title, id: nanoid() } }
      },
      (state, action) => {
        const newTodolist: DomainTodolist = {
          title: action.payload.title,
          id: action.payload.id,
          filter: "All",
          addedDate: "",
          order: 0,
        }
        state.push(newTodolist)
        //В нашем случае было проще генерировать id в компоненте, там где дергаём за dispatch.И не пришлось бы пользоваться preparedReducer.
      },
    ),
  }),
  selectors: {
    selectToDoLists: (state) => state,
  },
  extraReducers: (builder) => {
    // Первый аргумент в addCase идёт  callback функция, в данном случаем мы туда передаём функцию санку, которая нам возвращает res.data.
    builder
      .addCase(setTodolistsTC.fulfilled, (state, action) => {
        action.payload?.todolists.forEach((el) => {
          state.push({ ...el, filter: "All" })
        })
      })
      .addCase(changeToDoListTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload?.id)
        if (index !== -1) {
          if (action.payload) state[index].title = action.payload.title
        }
      })
  },
})

//Создаём Thunk - функция служущая для side эффектов в reducer.
// Создаётся при помощи функции createAsyncThunk, нейминг от action, только на конце TC.
// Первый аргументом принимает префикс, состоящий из названия слайса + название санки.
// Второй аргумент callback функция принимающая в себя 2 аргумента в параметрах arg и thunkApi
// Получаем dispatch из thunkApi и диспатчим значения полученные из запроса к api
// Для того что бы показать что один из аргументов не используется, применяется нижнее подчеркивание.(согласна соглашению )

//2 BLL делаем запрос к DAL,вызывая метод getTodolist объекта todolistsApi.
export const setTodolistsTC = createAsyncThunk(
  `${todolistsSlice.name}/setTodolistsTC`,
  async (_arg, { rejectWithValue }) => {
    // const { dispatch } = thunkAPI
    try {
      //4 Обрабатываем вернувшийся промис и диспатчим с санок в (todolist reducer), диспатчим передавая заранее созданный AC.
      const res = await todolistsApi.getTodolist()
      return { todolists: res.data }
      // dispatch(setTodolistsAC({ todolists: res.data }))
    } catch (error) {
      //в случае возникновения ошибки,
      rejectWithValue(null)
    }
  },
)

export const changeToDoListTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeToDoListTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      await todolistsApi.changeTodolistTitle(args)
      return args
    } catch (error) {
      rejectWithValue(null)
    }
  },
)

export const { selectToDoLists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
export const { DeleteTodolistAC, changeFilterAC, AddTodolistAC } = todolistsSlice.actions
