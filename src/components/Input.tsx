import  {ChangeEvent} from 'react';


type InputProps = {
    setNewTitle: (newTitle: string) => void;
    newTitle:string
}

export const Input = ({setNewTitle,newTitle}:InputProps) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value);
    }

    return <input value={newTitle} onChange={onChangeHandler}/>
};

