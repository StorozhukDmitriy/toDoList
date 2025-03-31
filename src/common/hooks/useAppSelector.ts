import {useSelector} from 'react-redux';
import {RootState} from '../../app/store.ts';


// через метод withTypes сразу добавляем типизацию для хука
//Прямая рекомендация в документации
export const useAppSelector = useSelector.withTypes<RootState>()