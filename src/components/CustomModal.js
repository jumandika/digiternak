import React from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { defaultStyles } from '../styles/defaultStyles';
import themeStyle from '../styles/theme.style';


const CustomModal = ({
    visible,
    transparent = true,
    animationType = "slide",
    onRequestClose,
    title,
    children
}) => {
    return <Modal
        animationType={animationType}
        transparent={transparent}
        visible={visible}
        onRequestClose={onRequestClose}
    >
        <View style={{ marginTop: 'auto', }}>
            <TouchableOpacity 
            onPress={onRequestClose}
            style={styles.closeButton}>
                <Ionicons name="close-outline" style={{ fontSize: 30, color: themeStyle.BLACK, }} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={[defaultStyles.baseText, { paddingLeft:20, fontSize: 28, paddingVertical: 15 }]}>{title}</Text>
                {children}
            </View>
        </View>
    </Modal>;
}

export { CustomModal }

const styles = StyleSheet.create({
    container: {
        // borderRadius: 20,
        // alignItems: "center",
        backgroundColor: '#FFF',
        elevation: 16,
    },
    closeButton: {
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 60,
        width: 60,
        elevation:5,
    }
})