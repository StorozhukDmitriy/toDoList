import {beforeEach, expect, test} from 'vitest';
import {FilterType, toDoListType} from '../App.tsx';
import {v1} from 'uuid';
import {
    AddTodolistAC,
    changeFilterAC,
    changeToDoListTitleAC,
    DeleteTodolistAC,
    todolistsReducer
} from './todolists-reducer.ts';


let todolistId1: string
let todolistId2: string
let startState: Array<toDoListType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})


test('correct todolist should be deleted',()=>{
    const endState = todolistsReducer(startState, DeleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be created',()=>{
    let title ='New todolist'
    const id = v1()
    const endState = todolistsReducer(startState, AddTodolistAC(title,id))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter:FilterType = 'Completed'
    const endState = todolistsReducer(startState, changeFilterAC(filter, todolistId2))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})


test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeToDoListTitleAC(todolistId2, title))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})