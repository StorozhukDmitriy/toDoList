import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { instance } from "@/common/instance"

//3 наша api делает запрос на сервер и возвращает промис
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
  changeTodolistTitle(payload: { id: string; title: string }) {
    debugger
    return instance.put<BaseResponse<{}>>(`/todo-lists/${payload.id}`, { title: payload.title })
  },
}
