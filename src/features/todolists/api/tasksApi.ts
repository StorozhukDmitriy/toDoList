import { instance } from "@/common/instance/Instance.ts"
import { BaseResponse } from "@/common/types"
import { DomainTask, GetTaskResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
  },

  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks`, { title: title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  changeTaskStatus(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.model,
    )
  },
  changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.model,
    )
  },
}
