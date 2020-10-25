import React, { Component } from 'react'
import { 
    ImageBackground, Text,
    StyleSheet, View, 
    TouchableOpacity, Alert
} from 'react-native'

import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput'

import { server, showError, showSuccess } from '../common'

const initialState = {
    name:'',
    email:'farney.tec@gmail.com',
    password:'123456',
    confirmPassowrd:'',
    //Atributo que vai dizer se estou no estado de Cadastro ou de login
    stageNew: false

}

export default class TelaLogin extends Component {

    //Dados do formulario
    state = {
        ...initialState
     

    }
    //Função que vai ser chamada nos dois cenarios
    signinOrSingup = () => {
        if(this.state.stageNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            //Usando o Axios que é o cliente http usado 
            //para enviar requisições à API
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassowrd: this.state.confirmPassowrd,
            })
            
            showSuccess('Usuário cadastrado!')
            this.setState({ ...initialState })

        } catch(e) {
            showError(e)
        }
    }   

    signin = async () => {
        try {
            //validando os dados do login e se ele validar ele vai receber a resposta
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })
            //Recebenco  a resposta eu tenho o token
            //E o token vai ser setado no Header Autorization 
            //sendo mandado em qualquer nova outorizção que for solicitada
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            //navegação
            this.props.navigation.navigate('Home')
                showError(e)
        } catch(e){

        }
    }

    
    render() {
        //Criando validações
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >=6)

        //Validando alguns compus do cadastro
        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >=3)
            validations.push(this.state.password === this.state.confirmPassowrd)

        }
        //Validano formulario.
        //Todos o valores tem que ser verdadeiros para a expressão ser verdadeira
        //Ele está pengando todos elementos do array e fazendo uma expressão lógica
        //Então só vou ter oformulario verdadeiro se o resultado for verdadeiro.
        const validandoForm = validations.reduce((vTotal, vAtual) => vTotal && vAtual)
        return (
            <ImageBackground source={backgroundImage}
                style={styles.background}>
                <Text style={styles.title}>Sem APPerreio</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Inforne seu dados'}
                    </Text>
                    {this.state.stageNew &&
                        <AuthInput icon='user' placeholder='Nome' 
                        value={this.state.name} 
                        //O onChangeText é chamado sempre que o valor mudar,
                        //sempre que o valor mudar eu mudo o estado da aplicação
                        style={styles.input} 
                        onChangeText={name => this.setState({ name })}/>
                    }
                    <AuthInput icon='at' placeholder='Email' 
                        value={this.state.email} 
                        //O onChangeText é chamado sempre que o valor mudar,
                        //sempre que o valor mudar eu mudo o estado da aplicação
                        style={styles.input} onChangeText={email => this.setState({ email })}/>
                    <AuthInput icon='lock' placeholder='Senha' 
                        value={this.state.password} 
                        style={styles.input}  secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}/>
                    {this.state.stageNew &&
                        <AuthInput icon='asterisk' 
                            placeholder='Confirmar Senha' 
                            value={this.state.confirmPassowrd} 
                            style={styles.input} secureTextEntry={true}
                            onChangeText={confirmPassowrd => this.setState({ confirmPassowrd })}/>            
                    
                    }
                    <TouchableOpacity onPress={this.signinOrSingup}
                        // Se o meu formulário não for válido vou desabilitar o botão
                        disabled={!validandoForm}>
                        {/* Alterando a cor do botão se o formulario não for valido com expressão ternaria */}
                        <View style={[styles.button, validandoForm ? {} : { backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Cadastar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>   
                    
                </View>
                {/* Responsável por fazer a auternancia entre os dois modulo, o de usuário e o de login */}
                <TouchableOpacity style={ { padding: 10} }
                    //No stageNew pego o valor atual nego e seto no proprio stageNew
                    //Sempre que clicar vou está alternando os valores
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? 'Já possui cadastro?' : 'Ainda não possui cadastro?' }
                        </Text>                    
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#D79C7A',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
        
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10 ,
        backgroundColor: '#FFF'       

    }, 
    button: {
        backgroundColor: '#0AA',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7

    }, 
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 22
    }
})
