import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'//importando a data de hoje
import 'moment/locale/pt-br'//Traduz o valor das datas

export default class TasksTodo extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text>Hoje</Text>
                        <Text>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksTodo}>
                    <Text>TasksList</Text>
                </View>                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //Permitindo que o componente cresça 100% da tela
        flex: 1
    },
    background: {
        flex: 3
    },
    tasksTodo: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    }

})