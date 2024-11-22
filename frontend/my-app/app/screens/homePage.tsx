'use client'

import { FormEvent, useEffect, useState } from 'react'
import TextWithCheckBox from '../components/textWithCheckbox'
import { inriaSansRegular, inriaSansBold } from '../layout'

import style from '../style/home.module.css'
import ProjectInput from '../components/projectInput'
import { readFile } from 'fs'
import excelFileReader from '../function/excelFileReader'

import * as xlsx from 'xlsx'
import getUniqueUsersWhoInteracted from '../function/uniqueActiveUsers'

export default function HomePage() {

    const [excelData, setExcelData] = useState<any[]>([])

    const [searchForSpecificMessage, setSearchForSpecificMessage] = useState<boolean>(false)
    const [searchForActiveUsers, setSearchForActiveUsers] = useState<boolean>(false)

    const [howManyMessages, setHowManyMessages] = useState<number>(2)

    let inputField: JSX.Element[] = []
    
    for(let i: number = 2; i < howManyMessages; i++) {
        inputField.push(
            <ProjectInput key={i} id={i.toString()} placeholder='Mais alguma mensagem?' setHowManyMessages={setHowManyMessages} getAllMessage={getAllMessage}/>
        )
    }

    function getAllMessage(message: string) {
        return message
    }

    const returnFormDataOnHandle = (ev: any) => {

        const howManyInputs: number = ev.currentTarget.length
        const messagesToSearch: Array<string> = []
        ev.preventDefault()

        for(let i:number = 0; i < howManyInputs; i++) {
            if(i + 2 == howManyInputs) {
                break
            }
            messagesToSearch.push(ev.currentTarget[i].value)
        }

        console.log(`Mensagens para procurar: ${messagesToSearch} \nNúmero de contatos ativos? ${searchForActiveUsers}`)
    }

    const readFileInput = async (event: any) => {

        const file = event.target.files?.[0];
        if (!file) return;

        const howManyUsers = await readingExcelFile(file)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        });

        
    }

    async function readingExcelFile(file: any) {
        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            
            reader.onload = (e) => {
                const arrayBuffer = e.target?.result;
                if(!arrayBuffer) reject("Excel file could not be created!");

                const jsonData: any = excelFileReader(arrayBuffer);
                const howManyUsers: number = getUniqueUsersWhoInteracted(jsonData);

                resolve(howManyUsers)
            }
            reader.readAsArrayBuffer(file)
        })
    } 


    return(
        <div className={`${style.container}`}>
            
            <h1 className={`${style.logo} ${inriaSansBold.className}`}>W E N I  <span className='ml-2'>M E S S A G E</span> <span className='ml-2'>F A C I L I T A T O R</span></h1>

            <div className={`${style.uploadScreen}`}>

                <TextWithCheckBox text='PROCURAR PELO NÚMERO DE MENSAGENS ESPECÍFICAS ENVIADAS?' itemToCheck={setSearchForSpecificMessage}/>

                <form
                    onSubmit={(ev) => returnFormDataOnHandle(ev)} 
                    className={`${!searchForSpecificMessage ? style.preStyle : style.posStyle} ${style.inputDiv} -mt-3 w-[60%] flex flex-col gap-5`}>
                        <ProjectInput key={1} id={'1'} placeholder='Digite aqui a mensagem que deseja procurar' getAllMessage={getAllMessage}/>
                        <ProjectInput key={2} id={'2'} placeholder='Mais alguma mensagem?' setHowManyMessages={setHowManyMessages} getAllMessage={getAllMessage}/>
                        {inputField}

                    <button type="submit">Submeter</button>
                </form>

                <TextWithCheckBox text='QUANTIDADE DE USUÁRIOS ATIVOS (QUE RESPONDERAM AO CHATBOT)' itemToCheck={setSearchForActiveUsers}/>

                <div className='flex flex-col'>
                    <input type="file" accept='.xlsx, .xls' onChange={readFileInput} id="fileToRead" />
                </div>

            </div>

        </div>
    )
}