export async function habilitar(disciplina,professor){

    global.d = 0;
    //console.log("getDisciplina_Login:",login);
    //console.log("getDisciplina_Disc:",disciplina);
    
    const res = await fetch('https://unipointapi.herokuapp.com/abrirChamada/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            disciplina: disciplina,
            professor: professor
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

