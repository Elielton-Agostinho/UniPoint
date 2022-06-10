import React,{useState,useEffect} from 'react'
import Background from '../components/Background'
import { Text } from 'react-native-paper'
import { Alert, Modal, Platform, Touchable, View,StyleSheet, Image,ImageBackground,FlatList } from 'react-native'
import * as LocalAuthentication  from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styleSheets } from 'min-document'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import {getUsuario,Horario,AptoMarcacao} from '../controllers/DashboardController'
import {getPonto} from '../services/disciplinas';
import {marcarPresenca} from '../services/Presenca';
import {getNomeAluno} from '../services/NomeAluno';
 
export default function Dashboard({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [nome, setNome] = useState();
  const [hora, setHora] = useState();
  const [user, setUser] = useState();
  const [disciplinas, setDisciplinas] = useState(0);
  const [habilitarMarcacao, setHabilitarMarcacao] = useState();
  const [itemsPonto, setItemsPonto] = useState();
  const [idDisc, setIdDisc] = useState();
  const [chamada, setChamada] = useState();

  async function validaDiciplina(){
    console.log('########ID_DISCIPLINA: ',disciplinas['ID']);
    AptoMarcacao(disciplinas['ID']).then(function(response2){
      setIdDisc(disciplinas['ID']);
      console.log('*****Resposta_AptoMarcacao: ',response2);
      setHabilitarMarcacao(response2);
    });
  }

  async function prerender(){
    AsyncStorage.getItem('matricula').then((result) =>{
      setUser(result);
      getNomeAluno(result).then(function(response){
        setNome(response);
      });
    }) 
    //let nome = getUsuario(user);
     
    //if(user != undefined){
      try {
        await Horario(user).then(function(response){
          setDisciplinas(response[0]);
          if(response[0] == undefined || response[0] == '' || response[0] == 0){
            setHora(false);
          }else{
            setHora(response[0].NOME + ' ('+response[0].COD_DISC+')');
            setChamada(response[0].CHAMADA);
            if(disciplinas == 0 || disciplinas['ID'] == undefined){
              setHabilitarMarcacao(false);setHora(false);
            }
            let arrayOb = [];
            console.log(user);
                let ponto = getPonto(user).then(function(resposta){
                  console.log('*****ponto: ',resposta);
                  for (let index = 0; index < resposta.length; index++) {
                    let data = new Date(resposta[index].DATA);
                    let dataAjustada = data.getDate() + ' / ' + (data.getMonth() + 1 )+ ' / ' + data.getFullYear() + ' - ' + data.getHours()+':'+data.getMinutes();
                    arrayOb.push({'COD_DISC':resposta[index].COD_DISC,'DATA':dataAjustada});
                  }
                  setItemsPonto(arrayOb);
                  console.log('*****ponto: ',arrayOb);
                });
          }
        });
      } catch (error) {
        console.log(error);
      }
      
    //setNome(nome);
  }
  
  
  useEffect(() => {
    prerender();
  },[hora]);

  async function ponto(){
    let arrayOb = [];
    console.log(user);
    let ponto = await getPonto(user).then(function(resposta){
      console.log('*****ponto: ',resposta);
      for (let index = 0; index < resposta.length; index++) {
        let data = new Date(resposta[index].DATA);
        let dataAjustada = data.getDate() + ' / ' + (data.getMonth() + 1 )+ ' / ' + data.getFullYear() + ' - ' + data.getHours()+':'+data.getMinutes();
        arrayOb.push({'COD_DISC':resposta[index].COD_DISC,'DATA':dataAjustada});
      }
      setItemsPonto(arrayOb);
      console.log('*****ponto: ',arrayOb);
    });
  }

  async function authenticate(){
    const hasPassword = await LocalAuthentication.isEnrolledAsync();
    console.log('********Localização: ',hasPassword);
    if(!hasPassword) return;

    const {success, error} = await LocalAuthentication.authenticateAsync();

    if (success) {
      let data = new Date();
      try { 
        let marcacao = await marcarPresenca(user,chamada,'E',data).then(function(res){
          setHabilitarMarcacao(res);
          console.log('******MARCACAO: ',res);
          if(res == true){
            Alert.alert("ERROR:",'Não foi possivel registrar a presença, favor tentar novamente.');
          }else{
            ponto();
          }

        });
        
      } catch (error) {
        console.log('******ERROR_MARCACAO: ',error)
      }
      
      Alert.alert("Sucesso:",'Autenticação realizada com sucesso!');
    }else{
      Alert.alert('Error:',error);
    }
    
  }

  function sair(){
    AsyncStorage.removeItem('matricula');
    navigation.goBack()
  }
  
  function btnMarcarPresenca(){
    console.log('******Entrouuu')
    if(Platform.OS === 'ios'){
      authenticate();
      setIsModalVisible(false);
    }else{
      Platform.OS === 'android' && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
          <View style={styleSheets.modal}>
            <Text style={styleSheets.authText}>Autentique-se utilizando sua digital</Text>
            <TouchableOpacity onPress={() =>{
            LocalAuthentication.cancelAuthenticate();
            setIsModalVisible(false);
            }}>
            <Text style={styleSheets.cancel}>Cancelar</Text>
          </TouchableOpacity>
          </View>
          
        </Modal>
      );
    }
    console.log('****ID_DISCIPLINA: ',idDisc);
    //marcarPresenca(user,);
  }
  const [value, setValue] = React.useState('left');
  //console.log('********STATE_NOME: ',nome);
  return (
    
    <Background>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/bgDash.png')} style={styles.header}>
          <Text style={styles.text}>Olá,</Text>
          <Text style={styles.text}>{nome} 😀</Text>
        </ImageBackground>
        <View style={styles.body}>
          <Text style={styles.textLocalization}>Sua Localização: </Text>
          <View style={styles.viewLocalizacao}>
            <Image style={styles.menuIcon} source={require('../assets/pin.png')} />  
            <Text>Av. Antônio Justa, 3779 - Meireles - Fortaleza</Text>
          </View>
          <View style={{top:'89%'}}>
            {hora == false ? null : (
              <View style={styles.cardPresenca}>
                <View style={styles.rowTitle}>
                  <Image style={styles.menuIcon} source={require('../assets/sun.png')} />
                  <Text style={styles.textCardPres}>Disciplina</Text>
                </View>
                <View style={styles.rowClock}>
                  <Image style={styles.clockIcon} source={require('../assets/clock.png')}  />
                  <Text style={styles.textCardPres}>{hora}</Text>
                </View>
                {habilitarMarcacao == true ? (<Button style={styles.buttonPresenca} mode="contained" onPress={() => btnMarcarPresenca()}>
                  Marcar presença
                </Button>) : (<Button style={styles.buttonPresenca}  enabled="false" mode="contained" onPress={() => validaDiciplina()}>
                  Verificar Liberação
                </Button>)}
                
              </View>
            
            )}
            <View style={{top:'-80%'}}>
              <Button style={styles.buttonTurmas}>
                <Image style={styles.image} source={require('../assets/turmas.png')} />
                  Marcações
              </Button>
              <FlatList
              style={{height:340,maxHeight:340}}
              data={itemsPonto}
              renderItem={({item}) => <Text style={styles.item}>Disciplina: {item.COD_DISC} | 
                                          Data: {item.DATA}</Text>}
              />
            </View>
          </View>

          
          
        </View>
        <Button style={styles.sair} mode="contained" onPress={() => sair()}
          goBack={navigation.goBack}>
            Sair
          </Button> 
      </View>
      
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  header: {
    flex: 1,
    width: '100%',
    height: 260,
    paddingTop:35,
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom:0,
    paddingLeft:10,
    marginTop:'5%',
    //backgroundColor: '#000000a0',
  },
  textItems:{
    flexDirection: 'column',
    borderWidth: 3,
    borderColor: "#060A39",
    
  },
  viewLocalizacao:{
    flex: 1,
    width: '100%',
    flexDirection: 'row'
  },
  sair:{
    //position: 'absolute',
    bottom: '-2%',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    height:70
    //marginLeft:5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    flexDirection: 'column',
  },
  image:{
    //paddingRight:50,
  },
  menuIcon:{
    width:10,
    height:10,
  },
  inputContainer: {
    flex: 1,
    marginTop: 0,
    top: 0,
    width: '100%'
  },
  body: {
    flex: 1,
    marginTop: '-120%',
    padding:'5%',
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
    width: '100%',
    backgroundColor: '#fff',
  },
  modal:{
    backgroundColor: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height:'40%'
  },
  cancel:{
    color:'red',
    fontSize: 16
  },
  authText:{
    color:'white',
    fontSize: 16
  },
  titleText:{
    fontSize: 35,
    fontWeight: 'bold',
    color:'white',
    top: -100,
    left: 10,
  },
  viewTop:{
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0,
    //width: '100%',
  },
  bellIcon:{
    
  },
  row: {
    width: 130,
    flexDirection: 'row',
    top: 1190,
    left: 235,
    justifyContent: 'space-evenly',
  },  
  textLocalization:{
    color: "#777777",
    //marginTop: '5%',
    //marginLeft: '5%',
    fontSize: 14,
  },
  rowLocalization:{
    width: 220,
    flexDirection: 'row',
    left: 5,
    margin: 0,
    //top: -90,
    justifyContent: 'space-evenly',
  },
  cardPresenca:{
    //flex: 1,
    backgroundColor: "#E2EAF6",
    width: '100%',
    maxHeight: 230,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top:'-90%',
    //top: '-60%',
    //bottom:'-20%',
  },
  rowTitle:{
    width: 130,
    flexDirection: 'row',
    left: 10,
    top: 10,
    padding: 5,
    justifyContent: 'space-evenly',
  },
  textCardPres:{
    fontSize: 22,
    color: "#777777",
  },
  rowClock:{
    flexDirection: 'row',
    left: 10,
    marginTop:'5%'
  },
  clock:{
    color: "#060A39",
  },
  buttonPresenca:{
    width: "90%",
    alignSelf: 'center',
    //bottom: -35,
    marginTop:'2%',
    marginBottom: '2%',
    borderRadius: 10,
  },
  buttonTurmas:{
    backgroundColor: "#fff",
    alignSelf: 'center',
    width: '100%',
    //marginTop:'-10%',
    borderWidth: 3,
    borderColor: "#060A39",
    justifyContent: 'space-between'
  }

});
