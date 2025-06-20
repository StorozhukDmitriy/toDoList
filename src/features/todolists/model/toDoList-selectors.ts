import { RootState } from "../../../app/store.ts"
import { toDoListType } from "@/features/todolists/model/todolists-reducer.ts"

//При помощи функции селект, делаем тип того что мы вернём из него, в дальнейшем можно не типизировать переменную
//Функция селектор повторяет (state)=>state.нужный стейт.
export const selectToDoLists = (state: RootState): Array<toDoListType> => state.todolists
