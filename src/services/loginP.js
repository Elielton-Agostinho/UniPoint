import AsyncStorage from '@react-native-async-storage/async-storage'

function onLoginPressed(login,senha){

    console.log("onLoginPressed");

    let res = fetch('https://unipointapi.herokuapp.com/loginProf/', {
        method: 'POST',
        Accept: 'application/json',
        headers: {
            "Access-Control-Allow-Origin": "true",
            'Content-Type': 'application/json'
        //    'Content-Type': 'application/json',
        },
        //"Access-Control-Allow-Origin": "true",
        mode: 'cors',
        //mode:'no-cors',
        body: JSON.stringify({
            matricula: login,
            senha: senha
        })
    })
    .then(response => { return response.json();})
    .then(responseData => {
        console.log(responseData.result);
        if(responseData.result === true){
            //const sessao = sessionStorage.setItem('matricula', login);  
            const session2 = AsyncStorage.setItem('matriculaP',login);
        }else{
            //const session2 = AsyncStorage.setItem('matricula',null);
        }
    })

    .catch(err => {
        console.log(err);
        return false;
    });
    
  }

export default onLoginPressed;
