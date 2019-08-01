import React from 'react';
import { Text, StyleSheet, Image} from 'react-native';
import logo from '../assets/images/icon.png'
export default class LogoTitle extends React.Component {
    render() {
      return (
          <Image source={logo} style={styles.logo}></Image> 
      );
    }
  }

const styles = StyleSheet.create({
    logo: {
        height: 30,
        width: 30
    },
    title: {
        color: '#000'
    }
})