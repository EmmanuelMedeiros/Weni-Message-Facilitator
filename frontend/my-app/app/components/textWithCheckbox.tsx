'use client'

import style from '../style/checkBox.module.css'

import { useState, useEffect } from "react"

interface CheckBoxProps {
    text: string
    itemToCheck: any
}

export default function TextWithCheckBox({text, itemToCheck}: CheckBoxProps) {

    const [checked, setChecked] = useState<boolean>(false)

    return(
        <div className={`flex gap-7 items-center`}>

            <h1 className="text-[#8F94CC]"> {text} </h1>

            <span
                onClick={() => {setChecked((prev) => (!prev)), 
                    itemToCheck((prev: boolean) => (!prev))
                }} 
                className={`${style.checkbox} ${checked ? style.checkedBox : null}`}/>

        </div>
    )
}