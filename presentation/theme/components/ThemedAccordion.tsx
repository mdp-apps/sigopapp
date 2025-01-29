import React, { useState } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Card, List } from "react-native-paper";

interface ThemedAccordionProps {
  children: React.ReactNode;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
}

export const ThemedAccordion = ({
  children,
  title,
  titleStyle,
  description = "",
  descriptionStyle,
}: ThemedAccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Accordion
      title={title}
      description={description}
      expanded={expanded}
      onPress={handlePress}
      titleStyle={[styles.titleStyle, titleStyle]}
      descriptionStyle={[styles.descriptionStyle, descriptionStyle]}
      style={[styles.accordionStyle, { backgroundColor: "#f3f3f3" }]}
    >
      <Card style={styles.cardStyle}>{children}</Card>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  accordionStyle: {
    backgroundColor: "white",
    width: 390,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  titleStyle: {
    fontSize: 22,
    fontFamily: "Ruda-Bold",
    color: "black",
  },
  descriptionStyle: {
    fontSize: 14,
    fontFamily: "Ruda-Bold",
  },
  cardStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    width: "100%",
    borderRadius: "none",
    backgroundColor: "white",
  },
});
