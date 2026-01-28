import { StyleSheet } from "react-native";

export const colors = {
  screen: "#F4F6FA",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  placeholder: "#94A3B8",
  primary: "#20B2AA",
  primaryPressed: "#15938D",
  link: "#2563EB",
};

export const authStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#0B1220",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(32,178,170,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
  },
  field: {
    marginTop: 12,
  },
  label: {
    color: colors.muted,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    color: colors.text,
    backgroundColor: "#FFFFFF",
  },
  passwordWrap: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeButton: {
    position: "absolute",
    right: 6,
    height: 48,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  linkRow: {
    marginTop: 14,
    alignItems: "center",
  },
  linkText: {
    color: colors.link,
    fontWeight: "800",
  },
});

