import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text
} from 'react-native'
import commonStyles from '../commonStyles'

export default class AddTask extends Component{

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
        flex: 3,
        backgroundColor: '#FFF'
    }, 
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 15

    }
})