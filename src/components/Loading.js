import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#007aff'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})

export default Loading