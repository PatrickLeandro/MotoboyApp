import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Feather} from '@expo/vector-icons'

const Menu = () => {
    const navigation = useNavigation();
    return (
            <TouchableOpacity style={styles.container} onPress={ () => navigation.openDrawer() } >
                <Feather 
                    name="menu"
                    size={36}
                    color="#373737"
                />
            </TouchableOpacity>

    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 9,
        width: 70,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 100,
        borderTopLeftRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        top: -30,
        left: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3
        }
    }
})
