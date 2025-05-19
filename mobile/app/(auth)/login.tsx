import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Login = () => {
    return (
        <View>
            <Text>login</Text>
            <Link href="/">Register Page</Link>
            <Text style={{ fontFamily: 'DotoBold', fontSize: 90 }}>Texte gras</Text>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({})