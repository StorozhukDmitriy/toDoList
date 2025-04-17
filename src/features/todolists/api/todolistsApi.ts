import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { instance } from "@/common/instance"

export const todolistsApi = {
  getTodolist() {
    return instance.get<Array<Todolist>>("/todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title: title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse<{}>>(`/todo-lists/${id}`)
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse<{}>>(`/api/1.1/todo-lists/${id}`, { title: title })
  },
}
