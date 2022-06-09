import React,{useState} from 'react'

async function getDisciplina(login,disciplina){

    global.d = 0;
    //console.log("getDisciplina_Login:",login);
    //console.log("getDisciplina_Disc:",disciplina);
    
    const res = await fetch('https://unipointapi.herokuapp.com/getDisciplinaProf/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: login,
            cd_disciplina: disciplina
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        if(responseData[0].vazio == 0){
            global.d = 0;
        }else{
            global.d = responseData;
        }
    })

    .catch(err => {
        console.log(err);
    });
    
    return global.d;
}


export default getDisciplina;
