export default async function podeMarcar(disciplina){
    console.log('*****Entrou_disciplina: ',disciplina);
    const res = await fetch('https://unipointapi.herokuapp.com/aptoAoPonto/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        
        },
        mode: 'cors',
        body: JSON.stringify({
            disciplina: disciplina
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        //let resultado = 0;
        //console.log(responseData[0].vazio);
        if(responseData[0].vazio == 0){
            global.d = false;
        }else{
            global.d = true;
        }
    })

    .catch(err => {
        console.log(err);
    });
      return global.d;
}
