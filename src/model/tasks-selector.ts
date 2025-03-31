import {RootState} from '../app/store.ts';
import {TaskStateType} from '../App.tsx';

export const selectTasks = (state:RootState):TaskStateType => state.tasks