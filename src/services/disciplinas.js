export async function getPonto(login){

    global.d = 0;
    //console.log("getDisciplina_Login:",login);
    //console.log("getDisciplina_Disc:",disciplina);
    
    const res = await fetch('https://unipointapi.herokuapp.com/getPonto/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: login
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        //let resultado = 0;
        //console.log(responseData[0].vazio);
        if(responseData[0].vazio == 0){
            //setDisc('Sem Disciplinas Neste Horário');
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

