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
            <Text style={styles.txt}>Aqui vai ser uma page onde o usuário pode adicionar quando foi a última troca de oleo, relação, pneus e etc... {'\n'}{'\n'}Para um maior controle sobre sua moto</Text>
        </LinearGradient>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    txt:{
        color: 'white',
        fontSize: 16,
    },
})
