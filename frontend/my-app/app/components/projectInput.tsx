import { Dispatch, SetStateAction, useState } from 'react'
import style from '../style/projectInput.module.css'

interface InputProps {
    placeholder: string,
    id: string,
    getAllMessage: (message: string) => string,
    setHowManyMessages?: Dispatch<SetStateAction<number>>,
}

export default function ProjectInput({placeholder, id, getAllMessage, setHowManyMessages}: InputProps) {

    const [alreadyPlusUpdated, setAlreadyPlusUpdated] = useState(false)
    const [alreadyMinusUpdated, setAlreadyMinusUpdated] = useState(false)

    return(
        <div>

            <input 
                type="text" 
                name="" 
                id={id}
                key={id}
                placeholder={placeholder}
                className={`${style.projectInput}`}
                onChange={(ev) => [ev.currentTarget.value.trim() !== "" 
                                  && setHowManyMessages !== undefined
                                  && !alreadyPlusUpdated 
                                  ? [setHowManyMessages((prev:number) => (prev + 1)), setAlreadyPlusUpdated(true)]
                                  : setHowManyMessages !== undefined && ev.currentTarget.value.trim() == "" && !alreadyMinusUpdated ? [setHowManyMessages((prev: number) => (prev - 1)), setAlreadyPlusUpdated(false)] : null]}
            />

        </div>
    )
}