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
    .then(responseData => {
        //let resultado = 0;
        //console.log(responseData[0].vazio);
        if(responseData == 'Entrada Registrada Com Sucesso!'){
            //setDisc('Sem Disciplinas Neste Horário');
            global.d = false;
        }else{
            //setDisc(responseData);
            global.d = true;
            //return responseData;
            //console.log('*****global.d: ',global.d)
        }
        //console.log(responseData);
       // setJdisciplina(responseData);
        
        //return resultado;
    })

    .catch(err => {
        console.log(err);
    });
    console.log('*******global.d: ',global.d);
    return global.d;
}
