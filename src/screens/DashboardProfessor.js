import React,{useState,useEffect} from 'react'
import Background from '../components/Background'
import { Text } from 'react-native-paper'
import { Alert, Modal, Platform, Touchable, View,StyleSheet, Image,ImageBackground,FlatList } from 'react-native'
import * as LocalAuthentication  from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styleSheets } from 'min-document'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
import {getUsuario,Horario,AptoMarcacao} from '../controllers/DashboardControllerProfessor';
import {getPonto} from '../services/AlunosPorDisciplina';
import {marcarPresenca} from '../services/Presenca';
import {getNomeProfessor} from '../services/NomeProfessor';
import {habilitar} from '../services/HabilitarMarcacao';
import {desabilitar} from '../services/DesabilitarMarcacao';
 
export default function DashboardProfessor({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [nome, setNome] = useState();
  const [hora, setHora] = useState();
  const [user, setUser] = useState();
  const [disciplinas, setDisciplinas] = useState(0);
  const [habilitarMarcacao, setHabilitarMarcacao] = useState();
  const [itemsPonto, setItemsPonto] = useState();
  const [idDisc, setIdDisc] = useState();
  const [chamada, setChamada] = useState();
  const [botaoBlock, setBotaoBlock] = useState(false);
  

  async function prerender(){
    AsyncStorage.getItem('matriculaP').then((result) =>{
      setUser(result);
      getNomeProfessor(result).then(function(response){
        setNome(response);
      });
    }) 
      try {
        await Horario(user).then(function(response){
          console.log(response);
          setDisciplinas(response[0]);
          if(response[0] == undefined || response[0] == '' || response[0] == 0){
            setHora(false);
          }else{
            setHora(response[0].NOME + ' ('+response[0].COD_DISC+')');
            setChamada(response[0].CHAMADA);
            if(disciplinas != 0 || disciplinas['ID'] != undefined){
              console.log('########ID_DISCIPLINA: ',disciplinas['ID']);
              AptoMarcacao(user,disciplinas['ID'],disciplinas['COD_DISC']).then(function(response2){
                setIdDisc(disciplinas['ID']);
                console.log('*****Resposta_AptoMarcacao: ',response2);
                setHabilitarMarcacao(response2);

              });
            }else{setHabilitarMarcacao(false);setHora(false);}
            let arrayOb = [];
            //console.log(user);
                let ponto = getPonto(user,idDisc).then(function(resposta){
                  if (resposta == 0) {
                    arrayOb.push({'MATRICULA':0,'ALUNO':'Nenhuma Presença Registrada'});
                  } else {
                    for (let index = 0; index < resposta.length; index++) {
                      arrayOb.push({'MATRICULA':resposta[index].MATRICULA,'ALUNO':resposta[index].NOME});
                    }
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

  async function habilitarPresenca(){
    let v = habilitar(idDisc,user).then(function(response){
      setHabilitarMarcacao(false);
      console.log(response);
      if (response == 0) {
        Alert.alert("Sucesso:",'Disciplina Liberada para Presença!'); 
      } else {
        Alert.alert("Error:",'Não Conseguimos Efetuar a Liberação da Disciplina'); 
      }
      ponto();
    });
  }

  async function desabilitarPresenca(){
    let v = desabilitar(chamada).then(function(response){
      setBotaoBlock(true);
      console.log(response);
      if (response == 0) {
        Alert.alert("Sucesso:",'Disciplina Fechada para Presença!'); 
      } else {
        Alert.alert("Error:",'Não Conseguimos Fechar a Disciplina!'); 
      }
      ponto();
    });
  }

  async function ponto(){
    let arrayOb = [];
            //console.log(user);
                let ponto = getPonto(user,idDisc).then(function(resposta){
                  if (resposta == 0) {
                    arrayOb.push({'MATRICULA':0,'ALUNO':'Nenhuma Presença Registrada'});
                  } else {
                    for (let index = 0; index < resposta.length; index++) {
                      arrayOb.push({'MATRICULA':resposta[index].MATRICULA,'ALUNO':resposta[index].NOME});
                    }
                  }
                  
                  setItemsPonto(arrayOb);
                  //console.log('*****ponto: ',arrayOb);
                });
  }

  function sair(){
    AsyncStorage.removeItem('matricula');
    navigation.goBack()
  }
  
  const [value, setValue] = React.useState('left');
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
          <View style={{top:'80%'}}>
            {hora == false ? null : (
              <View style={styles.cardPresenca}>
                <View style={styles.rowTitle}>
                  <Image style={styles.menuIcon} source={require('../assets/sun.png')} />
                  <Text style={styles.textCardPres}>Disciplina</Text>
                </View>
                <View style={styles.rowClock}>
                  <Image style={styles.clockIcon} source={require('../assets/clock.png')}  />
                  <Text style={styles.textTitCardPres}>{hora}</Text>
                </View>
                {habilitarMarcacao == true ? (<Button style={styles.buttonPresenca} mode="contained" onPress={() => habilitarPresenca()}>
                  Habilitar Chamada
                </Button>) : (<Button style={styles.buttonPresenca}  enabled="false" mode="contained" onPress={() => desabilitarPresenca()} disabled={botaoBlock} >
                  Desabilitar Chamada
                </Button>)}
               
              </View>
             
            )}
            <View style={{top:'-60%'}}>
              <Button style={styles.buttonTurmas} onPress={()=> ponto()}>
                <Image style={styles.image} source={require('../assets/turmas.png')} />  Alunos Presentes  <Image style={styles.image} source={require('../assets/turmas.png')} /> 
              </Button>
              <FlatList
              style={{height:340,maxHeight:340}}
              data={itemsPonto}
              renderItem={({item}) => <Text style={styles.item}>{item.MATRICULA} - {item.ALUNO}</Text>}
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
    top:'-80%',
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
  textTitCardPres:{
    top:5,
    fontSize: 25,
    color: "#777777",
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
    //top:'-60%',
    borderWidth: 3,
    borderColor: "#060A39",
    justifyContent: 'space-between'
  }

});
