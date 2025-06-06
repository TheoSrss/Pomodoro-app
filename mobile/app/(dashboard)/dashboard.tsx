import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Pomodoro from '../../components/pomodoro/pomodoro'
const Dashboard = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Pomodoro />
        </ScrollView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    }
})