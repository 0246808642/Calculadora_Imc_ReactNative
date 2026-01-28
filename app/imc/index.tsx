import { authStyles, colors } from "@/style/authStyle/auth";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ImcScreen() {
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [resultado, setResultado] = useState<number | null>(null);
    const [classificacao, setClassificacao] = useState("");
    const [erro, setErro] = useState<string | null>(null);

    const normalizeNumber = (value: string) => value.replace(",", ".").trim();

    const formatPesoInput = (value: string) => {
        // Mantém apenas dígitos e um único ponto (.), com até 2 casas decimais
        const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".");
        const parts = cleaned.split(".");
        const intPart = parts[0] ?? "";
        const decPart = parts[1] ?? "";
        if (parts.length === 1) return intPart;
        return `${intPart}.${decPart.slice(0, 2)}`;
    };

    const formatPesoOnBlur = (value: string) => {
        const normalized = normalizeNumber(value);
        if (!normalized) return "";
        const num = Number(normalized);
        if (!Number.isFinite(num)) return value;
        return num.toFixed(2);
    };

    const formatAlturaInput = (value: string) => {
        // Se o usuário digitar só números, formatamos como X.XX (ex.: 175 -> 1.75)
        // Se ele já digitar com ponto/vírgula, respeitamos e só normalizamos.
        const cleaned = value.replace(/[^\d.,]/g, "").replace(",", ".");
        if (cleaned.includes(".")) {
            const parts = cleaned.split(".");
            const intPart = parts[0] ?? "";
            const decPart = parts[1] ?? "";
            return `${intPart}.${decPart.slice(0, 2)}`;
        }

        const digits = cleaned.replace(/[^\d]/g, "");
        if (digits.length <= 1) return digits;

        const intPart = digits.slice(0, 1);
        const decPart = digits.slice(1, 3);
        return `${intPart}.${decPart}`;
    };

    const getImcColor = (imc: number) => {
        if (imc < 18.5) return "#3B82F6"; // azul
        if (imc < 24.9) return "#10B981"; // verde
        if (imc < 29.9) return "#F59E0B"; // amarelo
        if (imc < 34.9) return "#F97316"; // laranja
        if (imc < 39.9) return "#EF4444"; // vermelho
        return "#7C3AED"; // roxo
    };

    const calcularImc = () => {
        const pesoNum = parseFloat(normalizeNumber(peso));
        const alturaNum = parseFloat(normalizeNumber(altura));

        if (!pesoNum || !alturaNum) {
            setResultado(null);
            setClassificacao("Preencha peso e altura corretamente");
            setErro("Informe peso e altura válidos (ex.: 72.5 e 1.75).");
            return;
        }

        if (alturaNum <= 0 || pesoNum <= 0) {
            setResultado(null);
            setClassificacao("");
            setErro("Peso e altura devem ser maiores que zero.");
            return;
        }

        setErro(null);

        const imc = pesoNum / (alturaNum * alturaNum);
        setResultado(imc);

        if (imc < 18.5) {
            setClassificacao("😟 Abaixo do peso");
        } else if (imc < 24.9) {
            setClassificacao("😊 Peso ideal");
        } else if (imc < 29.9) {
            setClassificacao("😐 Acima do peso");
        } else if (imc < 34.9) {
            setClassificacao("⚠️ Obesidade grau 1");
        } else if (imc < 39.9) {
            setClassificacao("🚨 Obesidade grau 2");
        } else {
            setClassificacao("🛑 Obesidade mórbida");
        }
    };

    return (
        <View style={authStyles.screen}>
            <View style={authStyles.card}>
                <View style={authStyles.header}>
                    <View style={authStyles.brandIcon}>
                        <Ionicons name="fitness" size={22} color={colors.primary} />
                    </View>
                    <Text style={authStyles.title}>IMC</Text>
                    <Text style={authStyles.subtitle}>Informe seus dados e veja a classificação.</Text>
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Peso</Text>
                    <TextInput
                        placeholder="Ex.: 72,5"
                        placeholderTextColor={colors.placeholder}
                        keyboardType="decimal-pad"
                        value={peso}
                        onChangeText={(v) => setPeso(formatPesoInput(v))}
                        onBlur={() => setPeso((p) => formatPesoOnBlur(p))}
                        style={authStyles.input}
                    />
                    <Text style={styles.hint}>Em quilogramas (kg)</Text>
                </View>

                <View style={authStyles.field}>
                    <Text style={authStyles.label}>Altura</Text>
                    <TextInput
                        placeholder="Ex.: 1,75"
                        placeholderTextColor={colors.placeholder}
                        keyboardType="decimal-pad"
                        value={altura}
                        onChangeText={(v) => setAltura(formatAlturaInput(v))}
                        style={authStyles.input}
                    />
                    <Text style={styles.hint}>Em metros (m)</Text>
                </View>

                {erro && <Text style={styles.error}>{erro}</Text>}

                <Pressable
                    onPress={calcularImc}
                    style={({ pressed }) => [
                        authStyles.primaryButton,
                        pressed && authStyles.primaryButtonPressed,
                    ]}
                >
                    <Text style={authStyles.primaryButtonText}>Calcular IMC</Text>
                </Pressable>

                {resultado !== null && !erro && (
                    <View style={styles.resultCard}>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>Seu IMC</Text>
                            <View style={[styles.badge, { backgroundColor: getImcColor(resultado) }]}>
                                <Text style={styles.badgeText}>{resultado.toFixed(2)}</Text>
                            </View>
                        </View>
                        <Text style={styles.classification}>{classificacao}</Text>
                    </View>
                )}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    hint: {
        marginTop: 6,
        color: colors.muted,
        fontSize: 12,
    },
    error: {
        color: "#B91C1C",
        backgroundColor: "#FEE2E2",
        borderWidth: 1,
        borderColor: "#FCA5A5",
        padding: 10,
        borderRadius: 12,
        marginTop: 12,
        fontSize: 12,
    },
    resultCard: {
        marginTop: 18,
        backgroundColor: colors.card,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    resultRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    resultLabel: {
        color: colors.muted,
        fontSize: 14,
        fontWeight: "800",
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "900",
    },
    classification: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "800",
        lineHeight: 20,
    },
});
