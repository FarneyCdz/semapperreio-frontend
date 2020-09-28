import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList } from 'react-native'

import commonStyles from '../commonStyles.js'
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'//importando a data de hoje
import 'moment/locale/pt-br'//Traduz o valor das datas

import Task from '../components/Task'

export default class TasksTodo extends Component {
     //Criando um estado no componente
     state = {
        tasks: [{
            id: Math.random(),
            desc: 'Estudar IA',
            estimateAt: new Date(),
            doneAt: new Date(),

        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,   
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null, 
        }, {
            id: Math.random(),
            desc: 'Desenvolvendo projeto Estágio 3',
            estimateAt: new Date(),
            doneAt: null,                       
        }]
    }
    //Essa função vai receber o id da tarefa
    // Alterar o estado da tarefa se eu estiver concluida ela fica
    // aberta e se tiver aberta ele fica concluida
    toggleTask = taskId => {
        //TOdos os elementos com todos os elementos
        const tasks = [...this.state.tasks]
        //vou achar qual tarefa tem o mesmo id que eu recebi como parametro
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }

        })

        this.setState({ tasks })

    }
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
                {/* Passando as propriedades para do componente TasksTodo que é o 
                paipassando via props para as tasks uma comunicação direta*/}
                <View style={styles.tasksTodo}>
                    {/* O FlatList está percorrendo um array de objetos javascript 
                    puro sem conexão com algum componente react-native e criando a escrou */}
                    <FlatList data={this.state.tasks} 
                        //Pega a chave gerada a partir de cada um dos itens
                        //Redenrizando cada um dos itens
                        keyExtractor={item => `${item.id}`}
                       // e a função render eu recebo o item sendo ele já desestruturado
                       // Pegando cada atributo e passar paar a tarefacomo o id, descrição,
                       //data estimada e a data de conclusão
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} />}/>
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