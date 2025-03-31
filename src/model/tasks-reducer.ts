import type {TaskStateType} from '../App'
import {
    AddTodolistAC,
    DeleteTodolistAC,
} from './todolists-reducer.ts';

import {createReducer} from '@reduxjs/toolkit';

const initialState: TaskStateType = {}
// type AddTaskAT = ReturnType<typeof AddTaskAC>




export const tasksReducer = createReducer(initialState,(builder)=>{
    builder
        .addCase(DeleteTodolistAC,(state, action)=>{
            delete state[action.payload.id];
        })
        .addCase(AddTodolistAC,(state, action)=> {
            state[action.payload.id] = []
        })
})



export const deleteTaskAC = ({taskId, todolistId}: { taskId: string, todolistId: string }) => ({
    type: 'DELETE-TASK',
    payload: {taskId, todolistId}
} as const)

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => ({
    type: 'CREATE-TASK',
    payload: {todolistId, title}
} as const)


export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => ({
    type: 'CHANGE_TASK-STATUS',
    payload: {taskId, isDone, todolistId}
} as const)

export const changeTaskTitleAC = ({taskId, todolistId, title}: {
    taskId: string,
    todolistId: string,
    title: string
}) => ({
    type: 'CHANGE_TASK-TITLE',
    payload: {taskId, title, todolistId}
}as const)
