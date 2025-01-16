import { ImageBackground, ImageSourcePropType, StyleSheet } from "react-native";

import { ThemedView } from "@/presentation/theme/components";

interface ImgBackgroundLayoutProps {
  children: React.ReactNode;
  source: ImageSourcePropType;
}

export const ImgBackgroundLayout = ({ children,source }: ImgBackgroundLayoutProps) => {
  return (
    <ImageBackground
      className="flex-1 justify-center bg-cover bg-center"
      source={source}
      imageStyle={{ opacity: 0.5 }}
    >
      <ThemedView
        className="justify-center items-center"
        bgColor="transparent"
        safe
        margin
      >
        {children}
      </ThemedView>
    </ImageBackground>
  );
};
