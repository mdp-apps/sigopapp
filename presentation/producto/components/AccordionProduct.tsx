import { View } from 'react-native'
import { List, Divider } from "react-native-paper";

import { Colors } from '@/config/constants';

interface ProductoOtrosProps { 
  children: React.ReactNode;
  accordionTitle: React.ReactNode;
}

export const AccordionProduct = ({children,accordionTitle}: ProductoOtrosProps) => {
  return (
    <View className="flex-1">
      <List.Accordion
        title={accordionTitle}
        left={(props) => <List.Icon {...props} icon="format-list-group" />}
        titleStyle={{
          fontSize: 16,
          fontFamily: "Ruda-Bold",
        }}
        style={{ backgroundColor: Colors.light.quaternary, flex: 1 }}
      >
        <Divider />
        
        {children}
      </List.Accordion>

      <Divider />
    </View>
  );
};
