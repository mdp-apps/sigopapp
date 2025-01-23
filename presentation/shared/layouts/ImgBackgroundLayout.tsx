import { ImageBackground, ImageSourcePropType } from "react-native";

import { ThemedView } from "@/presentation/theme/components";

interface ImgBackgroundLayoutProps {
  children: React.ReactNode;
  source: ImageSourcePropType;
  className?: string;
}

export const ImgBackgroundLayout = ({
  children,
  source,
  className,
}: ImgBackgroundLayoutProps) => {
  return (
    <ImageBackground
      className="flex-1 justify-center bg-cover bg-center"
      source={source}
      imageStyle={{ opacity: 0.5 }}
    >
      <ThemedView
        className={["items-center",className].join(" ")}
        bgColor="transparent"
        safe
        margin
      >
        {children}
      </ThemedView>
    </ImageBackground>
  );
};
