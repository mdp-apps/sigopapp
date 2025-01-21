import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-paper";

import { useObservationImage } from "../hooks";
import { ThemedButton, ThemedText } from "@/presentation/theme/components";

import { DateAdapter } from "@/config/adapters";
import { ObservationReq } from "@/infrastructure/entities";

interface ObservationtextProps {
  observation: ObservationReq;
}

interface ObservationCardProps extends ObservationtextProps {
  showModal: () => void;
}

export const ObservationCard = ({ observation, showModal }: ObservationCardProps) => {
  const { getObservationImage } = useObservationImage();

  return (
    <View>
      {observation.path ? (
        <ThemedButton
          onPress={async () => {
            await getObservationImage(
              observation.reqCode,
              observation.path,
              "POST"
            );
            showModal();
          }}
        >
          <ObservationText observation={observation} />
        </ThemedButton>
      ) : (
        <ObservationText observation={observation} />
      )}
    </View>
  );
};

const ObservationText = ({ observation }: ObservationtextProps) => {
  return (
    <>
      <ThemedText variant="h4" className="font-bold text-center">
        {observation.tokenCode} - {observation.userComment}
      </ThemedText>
      <ThemedText variant="h5" className="text-center">
        {observation.path && <Icon source="camera" size={16}></Icon>}{" "}
        {observation.comment}
      </ThemedText>
      <ThemedText variant="h5" className="text-center">
        {DateAdapter.format(observation.dateComment, "dd/MM/yyyy HH:mm")}{" "}

        {observation.app === "1"
          ? "- Ingresado desde APP."
          : "- Ingresado desde Totem."}
      </ThemedText>
    </>
  );
};