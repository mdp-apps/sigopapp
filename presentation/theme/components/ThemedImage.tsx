import React from "react";
import { Image, ImageProps, View } from "react-native";

interface Props extends ImageProps {
  className?: string;
  url: string;
  width?: number;
  height?: number;
}

export const ThemedImage = ({
  className,
  url,
  width = 300,
  height = 300,
  ...rest
}: Props) => {
  return (
    <View className="flex-1">
      <Image
        className={[className].join(" ")}
        source={{ uri: url }}
        width={width}
        height={height}
        {...rest}
      />
    </View>
  );
};
