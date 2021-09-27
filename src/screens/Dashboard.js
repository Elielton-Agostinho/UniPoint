import React,{useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import { Alert, Modal, Platform, Touchable, View,StyleSheet, Image } from 'react-native'
import * as LocalAuthentication  from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styleSheets } from 'min-document'
import Clock from 'react-digital-clock';
 
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

  
  function btnMarcarPresenca(){
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

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <Image style={styles.bgDash} source={require('../assets/bgDash.png')} style={styles.image} />
        <Text style={styles.titleText}>Olá</Text>
        <Text style={styles.titleText}>Eduardo 😀</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.bellIcon}>  
          <Image source={require('../assets/bell.png')} style={styles.image} />
        </View>
        
        <Image style={styles.menuIcon} source={require('../assets/menu.png')} style={styles.image} />
      </View>
      <View>
        <Text style={styles.textLocalization}>Sua localização: </Text>
      </View>
      <View style={styles.rowLocalization}>
        <Image style={styles.menuIcon} source={require('../assets/pin.png')} style={styles.image} />
        <Text style={styles.localization}>Av. Washington Soares, 1321</Text>
      </View>
      <View style={styles.cardPresenca}>
        <View style={styles.rowTitle}>
          <Image style={styles.menuIcon} source={require('../assets/sun.png')} style={styles.image} />
          <Text style={styles.textCardPres}>Horário</Text>
        </View>
        <View style={styles.rowClock}>
          <Image style={styles.clockIcon} source={require('../assets/clock.png')} style={styles.image} />
          
        </View>
        <Button style={styles.buttonPresenca} mode="contained" onPress={() => navigation.navigate('Dashboard')}>
          Marcar presença
        </Button>
      </View>
      <Button style={styles.buttonTurmas} onPress={() => navigation.navigate('Dashboard')}>
        <Image style={styles.TurmasIcon} source={require('../assets/turmas.png')} style={styles.image} />
        Turmas
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 340,
    backgroundColor:'transparent',
    
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

  bgDash:{
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%', 
  },
  viewTop:{
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0,
  },
  bellIcon:{
    
  },
  row: {
    width: 130,
    flexDirection: 'row',
    top: -190,
    left: 235,
    justifyContent: 'space-evenly',
  },  
  textLocalization:{
    color: "#777777",
    top: -100,
    left: 12,
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
    width: '92%',
    maxHeight: 230,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    top: -70,
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
    width: '92%',
    justifyContent: 'space-between'
  }

});
