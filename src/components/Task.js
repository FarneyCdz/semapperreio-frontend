import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {
     
    //Determinando se a tarefa está concluida ou não
    const doneOrNotStyle = props.doneAt != null ?
        //Se a tarefa está concluida ele vai passar um traço no texto
        //se não ele vai aplicar um estilo vazio
        {textDecorationLine: 'line-through' } : {}
    //Data de conclusão para uma tarefa concluida e uma data estimada para uma tarefa não concluida
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formatedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')
 
    return (
        <View style={styles.container}>
            {/* Região que pode ser tocada */}
           <TouchableWithoutFeedback
           //Passando o Id do elemento que vai ser clicado
                onPress={() => props.onToggleTask(props.id)}>         
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
           </TouchableWithoutFeedback>
           
           
           
            <View>
                {/* Descrição da tarefa */}
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                {/* Estimativa da tarefa pronta */}
                <Text style={styles.date}>{formatedDate}</Text>

                {/* Quando a tarefa for concluída
                <Text>{props.doneAt + ""}</Text>
                */}
            </View>
            
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10 ,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#87CEFA',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color:commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    }


})
