import './App.css'
import {TaskType, ToDoList} from './components/ToDoList.tsx';
import  { useState} from 'react';
import {AddItemForm} from './components/AddItemForm.tsx';
import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Grid2,
    IconButton,
    Paper, Switch,
    ThemeProvider,
    Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {blue, orange} from '@mui/material/colors';
import {containerSx} from './ToDoListItem.styles.ts';
import {NavButton} from './components/NavButton.ts';
import {
    AddTodolistAC,
    changeFilterAC,
    changeToDoListTitleAC,
    DeleteTodolistAC,
} from './model/todolists-reducer.ts';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from './model/tasks-reducer.ts';
import {useAppDispatch} from './common/hooks/useAppDispatch.ts';
import {useAppSelector} from './common/hooks/useAppSelector.ts';
import {selectTasks} from './model/tasks-selector.ts';
import {selectToDoLists} from './model/toDoList-selectors.ts';

export type FilterType = 'All' | 'Active' | 'Completed';
export type toDoListType = {
    id: string;
    title: string;
    filter: FilterType
}
export type TaskStateType = {
    [toDoListId: string]: Array<TaskType>
}

function App() {

    const dispatch = useAppDispatch();
    const toDolists = useAppSelector(selectToDoLists)
    const tasks = useAppSelector(selectTasks);

    //Tasks
    const deleteTask = (taskId: string, todolistId: string) => {

        dispatch(deleteTaskAC({taskId ,todolistId}))
    }
    const addTask = (title: string, todolistId: string) => {


        dispatch(createTaskAC({todolistId,title}))
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId,todolistId,isDone}))
    }
    const changeTaskTitle = (taskId: string, todolistId: string, title: string) =>  {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }

    //Create ToDoList
    const addToDoList = (newTitle: string) => {
        dispatch(AddTodolistAC(newTitle))

    }
    const deleteToDoList = (toDoListId: string) => {
        dispatch(DeleteTodolistAC({id:toDoListId}))
    }
    const changeToDoListTitle = (toDoListId: string, newTitle: string) => {
        dispatch(changeToDoListTitleAC({toDoListId:toDoListId, title:newTitle}))
    }
    const changeFilter = (filter: FilterType, toDoListId: string) => {
        dispatch(changeFilterAC({filter:filter, id:toDoListId}))
    }

    const toDoListComponents = toDolists.map(el => {

        let filteredTask = tasks[el.id]
        if (el.filter === 'Active') {
            filteredTask = filteredTask.filter((task: TaskType) => !task.isDone)
        }
        if (el.filter === 'Completed') {
            filteredTask = filteredTask.filter((task: TaskType) => task.isDone)
        }
        return (
            <Grid2 key={el.id}>
                {/*elevation регулирует тень */}
                <Paper elevation={4} sx={{padding: '15px',}}>
                    <ToDoList
                        changeToDoListTitle={changeToDoListTitle}
                        changeTaskTitle={changeTaskTitle}
                        deleteToDoList={deleteToDoList}
                        toDoListId={el.id}
                        tasks={filteredTask}
                        title={el.title}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                    />
                </Paper>
            </Grid2>
        )
    })
    //Создаём тему
    type ThemeMode = 'dark' | 'light'
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            primary: blue,
            secondary: orange,
            mode: themeMode,
        },
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="lg" sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton backGround={theme.palette.primary.main}>Sign in</NavButton>
                                <NavButton backGround={theme.palette.primary.main}>Sign in</NavButton>
                                <NavButton backGround={theme.palette.primary.main}>faq</NavButton>
                                <Switch onChange={changeMode}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    {/*<grid2></grid2> c атрибутом container формирует ряды*/}
                    {/*в библиотеке material ui для точечной стилизации компонента используется атрибут sx*/}
                    <Grid2 sx={{padding: '25px 0'}} container>
                        <AddItemForm createItem={addToDoList}/>
                    </Grid2>
                    {/*spacing регулирует расстояние между ячейками внутри grid conainer*/}
                    <Grid2 container spacing={5}>
                        {toDoListComponents}
                    </Grid2>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App


