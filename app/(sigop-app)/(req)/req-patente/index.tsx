import { useEffect } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useReqs } from "@/presentation/req/hooks";

import { ThemedButton, ThemedView } from "@/presentation/theme/components";
import { PatentReqCard } from "@/presentation/req/components";

const ReqPatenteScreen = () => {
  const { reqs, isLoadingReqs, getRequirements } = useReqs();

  useEffect(() => {
    (async () => {
      await getRequirements({
        patent: "",
        requirement: "",
        date: "",
        turn: "",
        status: "",
        reqType: "",
        customer: "",
      });
    })();
  }, []);

  return (
    <ThemedView className="mt-3" margin safe>
      <ThemedButton
        variant="rounded"
        className="bg-light-primary mb-3"
        text="Buscar Requerimientos"
        textClassName="text-lg"
      />

      {isLoadingReqs && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={reqs}
        renderItem={({ item }) => <PatentReqCard req={item} />}
        keyExtractor={(item) => String(item.internalCode)}
      />
    </ThemedView>
  );
};

export default ReqPatenteScreen;
