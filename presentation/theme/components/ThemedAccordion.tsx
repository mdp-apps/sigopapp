import React, { useState } from "react";
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Card, List } from "react-native-paper";

interface ThemedAccordionProps {
  children: React.ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
}

export const ThemedAccordion = ({
  children,
  title,
  style,
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
      titleStyle={[styles.title, titleStyle]}
      descriptionStyle={[styles.description, descriptionStyle]}
      style={[styles.accordion, style]}
      titleNumberOfLines={2}
      right={
        (props) => (
          <List.Icon
            {...props}
            icon={expanded ? "chevron-up" : "chevron-down"}
            color="black"
            style={{ marginRight: 10 }}
          />
        )
      }
    >
      <Card style={styles.card} mode="contained">
        {children}
      </Card>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: "#f3f3f3",
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontFamily: "Ruda-Bold",
    color: "black",
  },
  description: {
    fontSize: 14,
    fontFamily: "Ruda-Bold",
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 1,
    elevation: 1,
    width: "100%",
    borderRadius: "none",
    backgroundColor: "white",
  },
});
