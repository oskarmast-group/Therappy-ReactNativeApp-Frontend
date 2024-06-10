import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextStyle } from "react-native";
import { PRIMARY_GREEN, TEXT } from "../constant/colors";
import { Link } from "react-router-native";

export interface TextProps {
  color?: string;
  weight?: TextStyle["fontWeight"];
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  textAlign?: "auto" | "center" | "justify" | "left" | "right";
  flexGrow?: number;
  flexShrink?: number;
  flex?: number;
  fontStyle?: "italic" | "normal";
  opacity?: number;
  style?: any;
  children: React.ReactNode;
}

export const BaseText: React.FC<TextProps> = ({
  children,
  color = TEXT,
  weight = "normal",
  fontSize = 16,
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  textAlign = "auto",
  flexGrow,
  flexShrink,
  flex,
  fontStyle = "normal",
  opacity = 1,
  style,
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: "Open Sans",
          color,
          fontWeight: weight as TextStyle["fontWeight"],
          fontSize,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          textAlign,
          flexGrow,
          flexShrink,
          flex,
          fontStyle,
          opacity,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const Title: React.FC<{ children: string; style: TextStyle }> = ({
  children,
  style,
}) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export const Body: React.FC<{ children: any; style?: TextStyle }> = ({
  children,
  style,
}) => {
  return <Text style={[styles.body, style]}>{children}</Text>;
};

export const CustomLink: React.FC<{ children: any; to: string }> = ({
  children,
  to,
}) => {
  return (
    <Link to={to} style={styles.customLink}>
      {children}
    </Link>
  );
};

export const SectionTitle: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={styles.sectionTitle}>{children}</Text>;
};

export const H4Title: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={styles.h4Title}>{children}</Text>;
};

export const ErrorText: React.FC<TextProps> = ({ children, style }) => {
  return (
    <BaseText
      style={[styles.errorText, style]}
      fontSize={12}
      weight={600}
      color="#d50000"
    >
      {children}
    </BaseText>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 0,
    fontSize: 30,
    fontWeight: "600",
    color: PRIMARY_GREEN,
  },
  body: {
    margin: 0,
    fontSize: 16,
    color: "#1e2205",
  },
  customLink: {
    // textDecorationLine: "none",
  },
  sectionTitle: {
    color: "#1e2205",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 5,
  },
  h4Title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  errorText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#d50000",
  },
});
