import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                headerShown: false
            }}
        >
            <Stack.Screen name="login/index" options={{ title: 'Login' }} />
            <Stack.Screen name="imc/index" options={{ title: 'IMC' }} />
            <Stack.Screen name="register/index" options={{ title: 'Register' }} />
        </Stack>
    );
}