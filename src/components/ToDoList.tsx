// import {Button} from './Button.tsx';
import {FilterType} from '../App.tsx';
import {AddItemForm} from './AddItemForm.tsx';
import {EditSpan} from './EditSpan.tsx';
import {Box, Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from '@mui/material';
import {Delete, DeleteForever} from '@mui/icons-material';
import {getListItemSx} from '../ToDoListItem.styles.ts';

type ToDoListPropsType = {
    toDoListId: string
    title: string;
    tasks: Array<TaskType>
    changeToDoListTitle: (toDoListId: string, newTitle: string) => void
    changeTaskTitle: (id: string, toDoListId: string, newTitle: string) => void
    deleteToDoList: (toDoListId: string) => void
    deleteTask: (id: string, toDoListId: string) => void;
    changeFilter: (filter: FilterType, toDoListId: string) => void;
    addTask: (newTitle: string, toDoListId: string) => void;
    changeTaskStatus: (id: string, newStatus: boolean, toDoListId: string) => void;
    filter: FilterType


}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const ToDoList = ({
                             title,
                             tasks,
                             deleteTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             toDoListId,
                             deleteToDoList,
                             changeTaskTitle,
                             changeToDoListTitle
                         }: ToDoListPropsType) => {


    const tasksList = tasks.length === 0
        ? <span style={{margin: '20px 0', display: 'inline-block', fontWeight: 'bold'}}>Ваш список пуст</span>
        : <List>{tasks.map(el => {
            const deleteTaskHandler = () => {
                deleteTask(el.id, toDoListId)
            }
            const AddNewTitleTask = (newTitle: string) => {
                changeTaskTitle(el.id, toDoListId, newTitle)
            }
            return <ListItem sx={getListItemSx(el.isDone)}
                             disablePadding key={el.id} className={el.isDone ? 'task-done' : 'task'}>
                <Box>
                    <Checkbox checked={el.isDone}
                              onChange={(e) => changeTaskStatus(el.id, e.currentTarget.checked, toDoListId)}/>
                    <EditSpan onBlur={AddNewTitleTask} title={el.title}/>
                </Box>
                <IconButton style={{marginRight: '10px'}} onClick={deleteTaskHandler} size={'small'}>
                    <Delete color={"primary"}/></IconButton>
            </ListItem>
        })}
        </List>


    const AddItem = (newTitle: string) => {
        addTask(newTitle, toDoListId)
    }
    const AddNewTitleForToDo = (newTitle: string) => {
        changeToDoListTitle(toDoListId, newTitle)
    }

    return (
        <div>
            <h3>
                <EditSpan title={title} onBlur={AddNewTitleForToDo}/>
                <IconButton size={'small'} onClick={() => deleteToDoList(toDoListId)}> <DeleteForever color={"primary"}/></IconButton>
            </h3>
            <AddItemForm createItem={AddItem}/>
            {tasksList}
            <div>
                <ButtonGroup  variant={'contained'}>
                    <Button disableElevation size={'small'} variant={'contained'}
                            color={filter === 'All' ? 'primary' : 'inherit'}
                            onClick={() => changeFilter('All', toDoListId)}>All</Button>
                    <Button disableElevation size={'small'} variant={'contained'}
                            color={filter === 'Active' ? 'primary' : 'inherit'}
                            onClick={() => changeFilter('Active', toDoListId)}>Active</Button>
                    <Button disableElevation size={'small'} variant={'contained'}
                            color={filter === 'Completed' ? 'primary' : 'inherit'}
                            onClick={() => changeFilter('Completed', toDoListId)}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

