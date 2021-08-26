import React,{useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Alert, Modal, Platform, Touchable, View,StyleSheet } from 'react-native'

import * as LocalAuthentication  from 'expo-local-authentication';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styleSheets } from 'min-document'
 
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
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={btnMarcarPresenca}
      >
        Marcar Presença
      </Button>
      <Button
      mode="contained"
      onPress={() => navigation.navigate('LoginScreen')}
    >Voltar
    </Button>
    </Background>
  )
}

const style = StyleSheet.create({
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
  }
});
