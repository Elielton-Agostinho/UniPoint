import React,{useState} from 'react'
import Background from '../components/Background'
import { Text } from 'react-native-paper'
import { Alert, Modal, Platform, Touchable, View,StyleSheet, Image,ImageBackground } from 'react-native'
import * as LocalAuthentication  from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styleSheets } from 'min-document'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from '../components/Button'
 
export default function Dashboard({ navigation }) {

  const [isModalVisible, setIsModalVisible] = useState(true);

  async function authenticate(){
    const hasPassword = await LocalAuthentication.isEnrolledAsync();
    if(!hasPassword) return;

    const {success, error} = await LocalAuthentication.authenticateAsync();

    if (success) {
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
  }
  const [value, setValue] = React.useState('left');
  return (
    <Background>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/bgDash.png')} style={styles.header}>
          <Text style={styles.text}>Olá, Nome do Aluno 😀</Text>
        </ImageBackground>
        <View style={styles.body}>
          <Text style={styles.textLocalization}>Sua Localização: </Text>
          <View style={styles.viewLocalizacao}>
            <Image style={styles.menuIcon} source={require('../assets/pin.png')} />  
            <Text>Localização</Text>
          </View> 
          <View style={styles.cardPresenca}>
            <View style={styles.rowTitle}>
              <Image style={styles.menuIcon} source={require('../assets/sun.png')} />
              <Text style={styles.textCardPres}>Disciplina</Text>
            </View>
            <View style={styles.rowClock}>
              <Image style={styles.clockIcon} source={require('../assets/clock.png')}  />
              
            </View>
            <Button style={styles.buttonPresenca} mode="contained" onPress={() => btnMarcarPresenca()}>
              Marcar presença
            </Button>
          </View>

          <Button style={styles.buttonTurmas} onPress={() => navigation.navigate('Dashboard')}>
            <Image style={styles.image} source={require('../assets/turmas.png')} />
            Turmas
          </Button>
          <Button mode="contained" onPress={() => sair()}
          goBack={navigation.goBack}>
            Sair
          </Button>
        </View>
        
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
    height: 160,
    paddingTop:25,
    //bottom:'-20',
    resizeMode: 'contain',
  },
  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom:0,
    //backgroundColor: '#000000a0',
  },
  viewLocalizacao:{
    flex: 1,
    width: '100%',
    flexDirection: 'row'
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
    marginTop: '-140%',
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
    top: -90,
    justifyContent: 'space-evenly',
  },
  cardPresenca:{
    flex: 1,
    backgroundColor: "#E2EAF6",
    width: '100%',
    maxHeight: 230,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top: '-25%',
    bottom:'-20%',
  },
  rowTitle:{
    width: 130,
    flexDirection: 'row',
    left: 10,
    top: -20,
    justifyContent: 'space-evenly',
  },
  textCardPres:{
    fontSize: 22,
    color: "#777777",
  },
  rowClock:{
    flexDirection: 'row',
    left: 10,
  },
  clock:{
    color: "#060A39",
  },
  buttonPresenca:{
    width: "90%",
    alignSelf: 'center',
    bottom: -35,
    borderRadius: 10,
  },
  buttonTurmas:{
    backgroundColor: "#fff",
    alignSelf: 'center',
    width: '100%',
    //marginTop:'-20%',
    borderWidth: 3,
    borderColor: "#060A39",
    justifyContent: 'space-between'
  }

});
