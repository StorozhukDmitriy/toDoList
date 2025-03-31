import {SxProps} from '@mui/material';

//Если стилей много выносим их в отдельный файл с расширением styles, создаём функция с типом SxProps
//Функция принимает в аргументах boolean и исходя из этого возвращает объект со стилями.
// Так же прям тут можно создать переменную с объектом и в него передать CSS.
// Стили прописываются через функцию, в том случае когда они в компоненте должны изменятся из-за каких либо условий.Так как в функцию в аргумент передаётся значение по которому она меняется.
// Если у нас стили не меняются исходя из условий, то записываем всё в объект.
export const getListItemSx = (isDone: boolean): SxProps => ({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '0',
    fontWeight: isDone ? 'normal' : 'bold',
    color: isDone ? 'grey' : 'black',
    opacity: isDone ? '0.5' : '1'
})

export const containerSx:SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const buttonSx:SxProps = {
    color: 'white',
    border: 'none',
}

//Пример создания объекта
// export const stylesForSpan:SxProps = {
//     padding: '10px',
//     margin:"0 auto"
// }