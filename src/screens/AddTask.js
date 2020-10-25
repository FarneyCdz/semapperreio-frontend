import React, { Component } from 'react'
import {
    Platform,
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native'


//Para usar na criação da data formatada
import moment from 'moment' 

import Icon from 'react-native-vector-icons/FontAwesome'

import DateTimerPicker from '@react-native-community/datetimepicker'

import commonStyles from '../commonStyles'

//Defindo estado inicial porque vai ter situações que vou precisar
//restartar ou resetar o estado
//Definindo a data atual para tarefa
//Definindo o selesionador  showDatePicker: false da data
//para ela só aparecer quando for chamada na tarefa
const initialSate = { desc: '', date: new Date(), showDatePicker: false}

export default class AddTask extends Component{
    //Definindo objeto
    state = {
        ...initialSate
    }
    //Lógica da função encapsulada
    getDatePicker = () => {
        let datePicker = <DateTimerPicker value={this.state.date}
            //Sempre que mudar vou mudar o estado para atualizar o valor
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />

       // const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if(Platform.OS === 'android') {
            datePicker = (
                <View>
                    {/* Sempre que for tocado o onPrees dentro do TouchableOpacity
                    ele vai mudar o estado para verdadeiro */}
                    <TouchableOpacity style={styles.date}
                        onPress={() => this.setState({showDatePicker: true })}>
                        <Icon name="calendar" size={20}
                        color={commonStyles.colors.today}/>
                        {/* <Text style={styles.date}>
                            {dateString}
                        </Text> */}
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    //Retornando o JSX
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                //Método que é requireido quando fechar a tela
                onRequestClose={this.props.onCancel}
                //Tipo de animação a ser exibida
                animationType='slide'> 
                {/* quando for clicado ele vai chamar o OnCancel sendo
                 assim uma comunicação indireta do filho para o pai.
                 O pai fica so observando os movimentos do filho*/}
                <TouchableWithoutFeedback
                    //Quando tocar na tela, fecho a aplicação
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                {/* Fomulário com informações da tarefa */}
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} 
                        placeholder="Nome ou descrição da tarefa"
                        //Escutando as mudanças do TexInput  
                        onChangeText={desc => this.setState({ desc })}
                        value ={this.state.desc}/>
                     {/*A resposta da função que criei vai gerar o cód JSX */}
                    {this.getDatePicker()}
                    {/* View que vai representar os botões um para cadastrar e 
                    outro para cancelar*/}
                    <View style={styles.buttons}>
                        {/* Cancelando o modal quando der um toque no background
                        ou no botão cancelar */}
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>

                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    //Quando tocar na tela, fecho a aplicação
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        flex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    }, 
    container: {
        backgroundColor: '#FFF'
    }, 
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15

    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor:'#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end' //justificado a direita

    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
       //fontFamily: commonStyles.fontFamily,
       // fontSize: 20,
        marginLeft: 20,
        color: commonStyles.colors.today

    }
        

})