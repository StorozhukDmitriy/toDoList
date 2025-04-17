import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { AddItemForm, EditSpan } from "@/common/components"
import { tasksApi, Todolist, todolistsApi } from "@/features/todolists/api"

import { DomainTask, TaskStatus, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"

//Инстанс заранее сделанный дефолтный объект, с какими либо сойствами.

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Array<Todolist>>([])
  //Record используется для типизации типов и значений (одинаковых по типу во всём объекте) в ассоциативном массиве.
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  //useEffect используем только для получения todolist с сервера, все остальные запросы простые функции.
  useEffect(() => {
    //В get первый параметр это url, второй объект с настройками headers (Способ авторизации)
    todolistsApi.getTodolist().then((res) => {
      const todolist = res.data
      setTodolists(todolist)
      todolist.forEach((el) => tasksApi.getTasks(el.id).then((res) => setTasks({ ...tasks, [el.id]: res.data.items })))
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newTodolist = res.data.data.item
      setTodolists([newTodolist, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then((res) => {
      console.log(res.data)
      setTodolists(todolists.filter((todolists) => todolists.id !== id))
    })
  }
  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle(id, title).then(() => {
      setTodolists(todolists.map((el) => (el.id === id ? { ...el, title } : el)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask(todolistId, title).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], newTask] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
      console.log(res.data)
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((el) => el.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title: task.title,
      deadline: task.deadline,
      startDate: task.startDate,
      status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
      priority: task.priority,
      description: task.description,
    }
    tasksApi.changeTaskStatus({ todolistId: todolistId, taskId: task.id, model: model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title: title,
      deadline: task.deadline,
      startDate: task.startDate,
      status: task.status,
      priority: task.priority,
      description: task.description,
    }
    tasksApi.changeTaskTitle({ todolistId: todolistId, taskId: task.id, model: model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm createItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditSpan title={todolist.title} onBlur={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <AddItemForm createItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditSpan title={task.title} onBlur={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
