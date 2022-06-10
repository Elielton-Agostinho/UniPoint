export async function desabilitar(chamada){

    global.d = 0;
    //console.log("getDisciplina_Login:",login);
    //console.log("getDisciplina_Disc:",disciplina);
    
    const res = await fetch('https://unipointapi.herokuapp.com/fecharChamada/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            id_chamada: chamada
        })
    })
    .then(response => { return response;})
    .then(responseData => {
        global.d = 0;  
    })

    .catch(err => {  
        global.d = err;
    }); 
    
    return global.d;
}

