import { useSelector } from "react-redux"
import { RootState } from "../../app/store.ts"

// через метод withTypes сразу добавляем типизацию для хука
//Прямая рекомендация в документации
// Создаём кастомный хук useAppSelector для сокращения количества кода, получаем сразу протипизированный хук.
export const useAppSelector = useSelector.withTypes<RootState>()
