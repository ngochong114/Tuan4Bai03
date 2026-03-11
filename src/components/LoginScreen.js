import React, { useState } from "react";
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, TextInput, Platform } from 'react-native';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const data = [
        {
            username: 'admin',
            password: '123'
        },
        {
            username: 'admin1',
            password: '1234'
        },
        {
            username: 'admin2',
            password: '12345'
        },
        {
            username: 'admin3',
            password: '123456'
        },
        {
            username: 'admin4',
            password: '1234567'
        }
    ]

    const handleLogin = () => {
        alert('Đăng nhập với email: ' + email)
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.formContainer}>
                <Text style={styles.header}>Đăng Nhập</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword} />
                <View style={styles.showPasswordButtonContainer}>
                    <Button title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onPress={() => setShowPassword(!showPassword)} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleLogin} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'blue',
        textAlign: 'center'
    },
    input: {
        fontSize: 18,
        padding: 5,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: 'rgb(0, 0, 0)',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    showPasswordButtonContainer: {
        width: Platform.OS === 'android' ? '100%': '10%',
        left: Platform.OS === 'android' ? 0 :'90% ',
        marginBottom: 10
    },
    buttonContainer: {
        marginTop: '10px'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})
export default LoginScreen;
