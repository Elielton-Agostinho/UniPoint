import React, { Component, useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image,Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import onLoginPressed from '../services/loginP';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LoginProfessor({ navigation }){
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [sessao,setSessao] = useState();
  const Login = async (login,senha) =>{
    await onLoginPressed(login,senha);
    
    // Aguardar 5 segundos
    setTimeout( function(){
      AsyncStorage.getItem('matriculaP').then((result) =>{
        console.log(result);
        if(result == 0 || result == null || result == '003141'){
          setSessao(false);
          Alert.alert('Erro:','Usuário não encontrado!');
        }else{
          setSessao(true);
          navigation.navigate('DashboardProfessor');
          
        }
      }) 
      console.log('Esse é o primeiro bloco de comandos após 5 segundos');
    }, 2000 );
    
   
  }
  console.log('*****SESSAO:',sessao);
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.dados}>
        <Logo />
        <Header>UniPoint</Header>
        <TextInput
          label="Matrícula"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="cc-number"
          textContentType="username"
          keyboardType="numeric"
        />
        <TextInput
          label="Senha"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPasswordScreen')}
          >
            <Text style={styles.forgot}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={() => {
          Login(email.value,password.value)
        }}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={styles.link}>'Faça aqui!'</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image source={require('../assets/ballsbottom.png')} style={styles.image} />
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

  image: {
    width: "100%",
    height: 100,
    position: 'absolute',
    flex:0.1,
    bottom: 0,
  },
  dados:{
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor:'transparent',
  }
})
