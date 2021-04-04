import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import Menu from '../../components/Menu';

const index = () => {
    return (
        <LinearGradient
        colors={['#2d3436', '#636e72']}
         style={styles.container}>
            <Menu />
            <Text style={styles.txt}>Aqui vai ter a previsão do tempo</Text>
        </LinearGradient>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        color: 'white',
        fontSize: 16,
    },
})
