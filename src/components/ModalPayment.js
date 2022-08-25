import React, { useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert, Modal, TouchableOpacity, ScrollView, StyleSheet, Text, Pressable, View } from "react-native";

const ModalPayment = ({ modalVisible, onClose, onOpen, children }) => {
    return (
        <Modal
            animationType="slide"
            presentationStyle='overFullScreen'
            visible={modalVisible}
            onRequestClose={onClose}

        // style={{height:'auto', alignSelf:'flex-end'}}
        >

            <View style={styles.container}>
                <View style={styles.modalView}>
                    {children}
                </View>
                <TouchableOpacity style={{ padding: 10, position: 'absolute', right: 0, top: 0 }} onPress={onClose}>
                    <MaterialCommunityIcons name="close" style={{ fontSize: 26, color: '#000' }} />
                </TouchableOpacity>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        backgroundColor: "#F7F7F7",

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export { ModalPayment };