import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}
 
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  },
  container: {
    flex: '100%',
    //padding: 10,
    width: '100%',
    //maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:2,
  },
})
