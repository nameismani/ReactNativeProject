import { View, Text, Appearance } from "react-native";
import React, { createContext, useContext, useState } from "react";
import { Colors, ThemeType } from "@/constants/Colors";

export interface ThemeContextType {
  colorScheme?: "light" | "dark" | null | undefined;
  setColorScheme?: React.Dispatch<
    React.SetStateAction<"light" | "dark" | null | undefined>
  >;
  theme?: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  console.log(colorScheme, "dsfdfe");
  return (
    <ThemeContext.Provider value={{ colorScheme, theme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
