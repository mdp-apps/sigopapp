import React from 'react'
import { TextStyle, ViewStyle } from 'react-native';

import {
  TabsProvider,
  Tabs,
  TabScreen,
} from "react-native-paper-tabs";
import { useThemeColor } from '../hooks';

export interface Tab {
  label: string;
  icon?: string;
  component: React.ReactNode;
  disabled?: boolean;
  badge?: boolean | string | number;
  onPressIn?: () => void;
  onPress?: () => void;
}

interface ThemedTabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  uppercase?: boolean;
  showTextLabel?: boolean;
  iconPosition?: "leading" | "top";
  style?: ViewStyle;
  dark?: boolean;
  mode?: "fixed" | "scrollable";
  showLeadingSpace?: boolean;
  disableSwipe?: boolean;
  tabHeaderStyle?: ViewStyle;
  tabLabelStyle?: TextStyle;
}

export const ThemedTabs = ({
  tabs,
  defaultIndex = 0,
  uppercase = true,
  showTextLabel = false,
  iconPosition = "leading",
  style,
  dark = false,
  mode = "fixed",
  showLeadingSpace = true,
  disableSwipe = false,
  tabHeaderStyle,
  tabLabelStyle,
}: ThemedTabsProps) => {
  const primaryColor = useThemeColor({},"primary");

  return (
    <TabsProvider defaultIndex={defaultIndex}>
      <Tabs
        uppercase={uppercase}
        showTextLabel={showTextLabel}
        iconPosition={iconPosition}
        style={style}
        dark={dark}
        theme={{
          colors: {
            primary: primaryColor,
          },
        }}
        mode={mode}
        showLeadingSpace={showLeadingSpace}
        disableSwipe={disableSwipe}
        tabHeaderStyle={tabHeaderStyle}
        tabLabelStyle={tabLabelStyle}
      >
        {tabs.map((tab, index) => (
          <TabScreen
            key={index}
            label={tab.label}
            icon={tab.icon}
            disabled={tab.disabled}
            badge={tab.badge}
            onPressIn={tab.onPressIn}
            onPress={tab.onPress}
          >
            {tab.component}
          </TabScreen>
        ))}
      </Tabs>
    </TabsProvider>
  );
};
