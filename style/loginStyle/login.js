import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24
    },
    title: {
        fontSize: 26,
        marginBottom: 24,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius:4,
        marginBottom:12,
        padding:10
    },
    passwordContainer: {
        position: "relative",
        marginBottom: 12
    },
    passwordInput: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        paddingRight: 90
    },
    togglePasswordButton: {
        position: "absolute",
        right: 10,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        paddingHorizontal: 6
    },
    togglePasswordText: {
        color: "#007AFF",
        fontWeight: "bold"
    }
})