import React,{useState} from 'react'

async function getDisciplina(login,disciplina){

    global.d = 0;
    //console.log("getDisciplina_Login:",login);
    //console.log("getDisciplina_Disc:",disciplina);
    
    const res = await fetch('https://unipointapi.herokuapp.com/getDisciplina/', {
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
        //let resultado = 0;
        //console.log(responseData[0].vazio);
        if(responseData[0].vazio == 0){
            //setDisc('Sem Disciplinas Neste Horário');
            global.d = 'Sem Disciplinas Neste Horário';
        }else{
            //setDisc(responseData);
            global.d = responseData;
            //return responseData;
            //console.log('*****global.d: ',global.d)
        }
        //console.log(responseData);
       // setJdisciplina(responseData);
        
        //return resultado;
    })

    .catch(err => {
        console.log(err);
        //return false;
    });
    /*return setTimeout( function(){
        console.log('*********RESPONSE: ', global.d);
        
      }, 2000 ); */
      return global.d;
}

//export default {getDisciplina,getAluno};


export default getDisciplina;
