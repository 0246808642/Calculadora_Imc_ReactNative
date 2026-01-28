import { authStyles, colors } from "@/style/authStyle/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

    // Regex
    const usuarioRegex = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{5,15}$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    const handleRegister = () => {
        if (!usuario || !senha || !confirmarSenha) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (!usuarioRegex.test(usuario)) {
            Alert.alert(
                "Usuário inválido",
                "Use apenas letras, entre 5 e 15 caracteres, com maiúscula e minúscula"
            );
            return;
        }

        if (!senhaRegex.test(senha)) {
            Alert.alert(
                "Senha fraca",
                "A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula e número"
            );
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        Alert.alert("Sucesso", "Usuário registrado com sucesso!");
        router.back(); // volta para o login
    };

    return (
        <View style={authStyles.screen}>
            <View style={authStyles.card}>
                <View style={authStyles.header}>
                    <View style={authStyles.brandIcon}>
                        <Ionicons name="person-add" size={22} color={colors.primary} />
                    </View>
                    <Text style={authStyles.title}>Registrar</Text>
                    <Text style={authStyles.subtitle}>
                        Crie sua conta e comece a usar agora
                    </Text>
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Usuário</Text>
                    <TextInput
                        placeholder="Ex: Caique07"
                        placeholderTextColor={colors.placeholder}
                        value={usuario}
                        onChangeText={setUsuario}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={authStyles.input}
                        returnKeyType="next"
                    />
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Senha</Text>
                    <View style={authStyles.passwordWrap}>
                        <TextInput
                            placeholder="Crie uma senha"
                            placeholderTextColor={colors.placeholder}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!senhaVisivel}
                            autoCapitalize="none"
                            style={[authStyles.input, authStyles.passwordInput]}
                            returnKeyType="next"
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

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Confirmar senha</Text>
                    <View style={authStyles.passwordWrap}>
                        <TextInput
                            placeholder="Repita a senha"
                            placeholderTextColor={colors.placeholder}
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            secureTextEntry={!confirmarSenhaVisivel}
                            autoCapitalize="none"
                            style={[authStyles.input, authStyles.passwordInput]}
                            returnKeyType="done"
                        />

                        <Pressable
                            onPress={() => setConfirmarSenhaVisivel((v) => !v)}
                            style={authStyles.eyeButton}
                            accessibilityRole="button"
                            accessibilityLabel={confirmarSenhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                            hitSlop={10}
                        >
                            <Ionicons
                                name={confirmarSenhaVisivel ? "eye-off" : "eye"}
                                size={22}
                                color={colors.muted}
                            />
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    onPress={handleRegister}
                    style={({ pressed }) => [
                        authStyles.primaryButton,
                        pressed && authStyles.primaryButtonPressed,
                    ]}
                >
                    <Text style={authStyles.primaryButtonText}>Registrar</Text>
                </Pressable>

                <View style={authStyles.linkRow}>
                    <Pressable onPress={() => router.back()}>
                        <Text style={authStyles.linkText}>Já tenho conta</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
