import React,{useState} from 'react'
export async function getNomeProfessor(aluno){
    console.log('*****Entrou_getNomeProfessor: ',aluno);
    const res = await fetch('https://unipointapi.herokuapp.com/getProfessor/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: aluno
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        let resp = responseData[0].NOME;
        let nome = resp.split(' ');
        global.d = nome[0]+" "+nome[1];
        
    })

    .catch(err => {
        console.log(err);
    });
    console.log('*******global.d: ',global.d);
    return global.d;
}
