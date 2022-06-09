export default async function podeMarcar(professor,disciplina,codDisc){
    console.log('*****Entrou_disciplinaProfessor: ',disciplina);
    const res = await fetch('https://unipointapi.herokuapp.com/verificaDisciplianAberta/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            matricula: professor,
            cd_disciplina: disciplina,
            cod_disc_comp: codDisc
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        //let resultado = 0;
        //console.log(responseData[0].vazio);
        if(responseData[0].RETORNO == 'N'){
            global.d = true;
        }else{
            global.d = false;
        }
    })

    .catch(err => {
        console.log(err);
    });
      return global.d;
}
