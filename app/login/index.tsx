import { authStyles, colors } from "@/style/authStyle/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";


export default function LoginScreen() {

    const usuariosCadastrado = [
        {
            usuario: 'Caique07',
            senha: 'Caique123'
        }
    ]

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const handleRegister = () => {
        router.push("/register" as any);
    };
    const handleLogin = () => {
        if (!usuario || !senha) {
            Alert.alert("Preencha todos os campos")
            return;
        }

        const usuarioFind = usuariosCadastrado.find(
            u => u.usuario === usuario && u.senha === senha
        );

        if (!usuarioFind) {
            Alert.alert("Error", "Usuário ou senha inválidos")
            return;
        }

        Alert.alert("Sucesso", `Bem-vindo, ${usuario}`)
        router.replace('/imc')
    };
    return (
        <View style={authStyles.screen}>
            <View style={authStyles.card}>
                <View style={authStyles.header}>
                    <View style={authStyles.brandIcon}>
                        <Ionicons name="fitness" size={22} color={colors.primary} />
                    </View>
                    <Text style={authStyles.title}>Login</Text>
                    <Text style={authStyles.subtitle}>
                        Entre para calcular seu IMC rapidinho
                    </Text>
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Usuário</Text>
                    <TextInput
                        placeholder="Digite seu usuário"
                        placeholderTextColor={colors.placeholder}
                        style={authStyles.input}
                        value={usuario}
                        onChangeText={setUsuario}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                    />
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Senha</Text>
                    <View style={authStyles.passwordWrap}>
                        <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor={colors.placeholder}
                            secureTextEntry={!senhaVisivel}
                            style={[authStyles.input, authStyles.passwordInput]}
                            value={senha}
                            onChangeText={setSenha}
                            autoCapitalize="none"
                            returnKeyType="done"
                        />

                        <Pressable
                            onPress={() => setSenhaVisivel((v) => !v)}
                            style={authStyles.eyeButton}
                            accessibilityRole="button"
                            accessibilityLabel={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                            hitSlop={10}
                        >
                            <Ionicons
                                name={senhaVisivel ? "eye-off" : "eye"}
                                size={22}
                                color={colors.muted}
                            />
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    onPress={handleLogin}
                    style={({ pressed }) => [
                        authStyles.primaryButton,
                        pressed && authStyles.primaryButtonPressed,
                    ]}
                >
                    <Text style={authStyles.primaryButtonText}>Entrar</Text>
                </Pressable>

                <Pressable onPress={handleRegister} style={authStyles.secondaryButton}>
                    <Text style={authStyles.secondaryButtonText}>Criar conta</Text>
                </Pressable>
            </View>
        </View>
    );
}