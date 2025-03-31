import {FilterType, toDoListType} from '../App.tsx';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';


//RTK синтаксис, создаем AC через метод createAction
export const DeleteTodolistAC = createAction<{ id: string }>('todolists/DeleteTodolist')
export const changeFilterAC = createAction<{ filter: FilterType, id: string }>('todolists/CHANGE-FILTER')
export const changeToDoListTitleAC = createAction<{
    toDoListId: string,
    title: string
}>('todolists/CHANGE-TODOLIST-TITLE')
export const AddTodolistAC = createAction('todolists/ADD-TODOLIST', (title: string) => {
    return {payload: {title: title, id: nanoid()}}
})



//Окончание АТ  ActionType , при помощи ReturnType  говорим что type в AT будет передан из функций ActionCreator (AC)
const initialstate: Array<toDoListType> = []

//С помощью createReducer создаём reducer
export const todolistsReducer = createReducer(initialstate,(builder)=>{
    builder
        .addCase(DeleteTodolistAC,(state, action)=>{
        const index = state.findIndex(todo => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
    })
        .addCase(AddTodolistAC,(state, action)=> {
            state.push({...action.payload, filter: 'All'})
        })
        .addCase(changeToDoListTitleAC,(state, action)=>{
            const index = state.findIndex(todo=>todo.id === action.payload.toDoListId)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeFilterAC,(state, action)=>{
            const index = state.findIndex(todo=>todo.id === action.payload.id)
            if (index !== -1) {
                state[index].filter = action.payload.filter
            }
        })

})




