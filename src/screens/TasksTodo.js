import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import commonStyles from '../commonStyles.js'
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'//importando a data de hoje
import 'moment/locale/pt-br'//Traduz o valor das datas

import Task from '../components/Task'

export default class TasksTodo extends Component {
    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.tasksTodo}>
                   <Task desc='Estudar IA' estimateAt={new Date()}  
                   doneAt={new Date()}/>
                    <Task desc='Estudar Sistemas Distriduídos' estimateAt={new Date()} 
                    doneAt={null}/>
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
        flex: 5
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.fontFamily.secondary,
        fontSize: 48,
        marginLeft: 20,
        marginBottom: 1
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.fontFamily.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30

    }

})