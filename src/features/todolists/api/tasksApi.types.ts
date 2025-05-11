export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTaskResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

//Синтаксис без =
//Типизируется автоматически и подставляем в status во всех типах.
// Нельзя переопределить
export enum TaskStatus {
  New,
  InProgress,
  Completed,
  Draft,
}
export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
