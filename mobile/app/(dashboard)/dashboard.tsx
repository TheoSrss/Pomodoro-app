import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserOnly from '../../components/auth/UserOnly'

const Dashboard = () => {
    return (
        <UserOnly>
            <View>
                <Text>Dashboard</Text>
            </View>
        </UserOnly>
    )
}

export default Dashboard

const styles = StyleSheet.create({})