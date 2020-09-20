import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import TelaLogin from './screens/TelaLogin'
import TasksTodo from './screens/TasksTodo'

const mainRoutes = {
    TelaLogin: {
        name: 'TelaLogin',
        screen: TelaLogin
    },
    Home: {
        name: 'Home',
        screen: TasksTodo
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    //Passando a rota inicia como parametro
    initialRouteName: 'TelaLogin'

})

export default createAppContainer(mainNavigator)
