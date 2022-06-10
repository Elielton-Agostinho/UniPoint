import React,{useState} from 'react'
export async function marcarPresenca(aluno,disciplina,tipo,horario){
    console.log('*****Entrou_marcarPresenca: ',disciplina);
    const res = await fetch('https://unipointapi.herokuapp.com/setPonto/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: aluno,
            disciplina: disciplina,
            tipo: tipo,
            horario: horario
        })
    })
    .then(response => { return response.json();})
    .then(data => {
        //let resultado = 0;
        console.log('******data: ',data.result);
        if(data.result == true){
            global.d = false;
        }else{
            global.d = true;
        }
    })

    .catch(err => {
        console.log(err);
    });
    console.log('*******global.d: ',global.d);
    return global.d;
}
