import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from './pages/Home';
import Previsao from './pages/Previsao';
import Troca from './pages/Troca';



const Drawer = createDrawerNavigator();

function Routes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen 
                name="Home"
                component={Home}
                options={{
                    title: 'Home'
                }}
            />

            <Drawer.Screen 
                name="Previsao"
                component={Previsao}
                options={{
                    title: 'Previsão do tempo'
                }}
            />

            <Drawer.Screen 
                name="Manutenção"
                component={Troca}
                options={{
                    title: 'Manutenção'
                }}
            />
        </Drawer.Navigator>
    )
}


export default Routes;