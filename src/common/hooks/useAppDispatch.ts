import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store.ts"

// через метод withTypes сразу добавляем типизацию для хука
//Прямая рекомендация в документации
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
