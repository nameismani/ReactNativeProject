import { Text, type TextProps, StyleSheet } from "react-native";

import { useTheme } from "@/provider/ThemeProvider";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        ...StyleSheet.flatten(style || {}),
        color: theme?.text,
        ...(type === "default" ? styles.default : {}),
        ...(type === "title" ? styles.title : {}),
        ...(type === "defaultSemiBold" ? styles.defaultSemiBold : {}),
        ...(type === "subtitle" ? styles.subtitle : {}),
        ...(type === "link" ? styles.link : {}),
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
