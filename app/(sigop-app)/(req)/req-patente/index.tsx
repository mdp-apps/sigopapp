import React from "react";

import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useReqs } from "@/presentation/req/hooks";

import { ThemedButton, ThemedView } from "@/presentation/theme/components";
import { PatentReqCard } from "@/presentation/req/components";

const ReqPatenteScreen = () => {
  const { queryReqs } = useReqs();

  return (
    <ThemedView className="mt-3" margin safe>
      <ThemedButton
        variant="rounded"
        className="bg-light-primary mb-3"
        text="Buscar Requerimientos"
        textClassName="text-lg"
      />

      {queryReqs.isLoading && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <FlatList
        data={queryReqs.data}
        renderItem={({ item }) => <PatentReqCard req={item} />}
        keyExtractor={(item) => String(item.reqCode)}
      />
    </ThemedView>
  );
};

export default ReqPatenteScreen;
