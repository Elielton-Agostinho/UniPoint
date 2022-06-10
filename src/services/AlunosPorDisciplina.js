export async function getPonto(professor,disciplina){

    global.d = 0;
    
    const res = await fetch('https://unipointapi.herokuapp.com/getAlunosDisciplina/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: professor,
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

