import {Button, styled} from '@mui/material';

type NavButtonProps = {
    backGround?:string
}

//Тот случай когда нам необходим создать переиспользуемую несколько раз компоненту, которая может менять свой цвет в разных местах

export const NavButton=styled(Button)<NavButtonProps>(({backGround,theme})=>({
    minWidth: '100px',
    fontWeight: '500',
    border: 'none',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: '#ffffff',
    background: backGround || theme.palette.primary.dark,
}))