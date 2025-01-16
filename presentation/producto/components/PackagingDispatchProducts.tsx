import React, { useState, useEffect } from "react";

import { View, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";

import {
  usePackagingByCustomer,
  useUpdatePackaging,
} from "@/presentation/envase/hooks";
import { useVisibility } from "@/presentation/shared/hooks";
import { useAuthStore } from "@/presentation/auth/store";

import {
  ThemedButton,
  ThemedChip,
  ThemedDropdown,
  ThemedSnackbar,
  ThemedText,
} from "@/presentation/theme/components";
import { AccordionProduct, ItemAccordionProduct, ModalProductDetail } from "./";

import { ProductReq } from "@/infrastructure/entities";
import { COMPONENT_TYPE } from "@/config/constants";

import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ProductosProps {
  productsPerBatch: { [key: string]: ProductReq[] };
}

export const PackagingDispatchProducts = ({
  productsPerBatch,
}: ProductosProps) => {
  const [modalProduct, setModalProduct] = useState<ProductReq>(
    {} as ProductReq
  );

  const [selectedPackagingDetails, setSelectedPackagingDetails] = useState({
    packagingCode: "",
    packagingQuantity: "",
  });

  const { packagingCode, packagingQuantity } = selectedPackagingDetails;

  const {
    isVisible: isVisibleModal,
    show: showModal,
    hide: hideModal,
  } = useVisibility();

  const {
    isVisible: isVisibleSnackbar,
    show: showSnackbar,
    hide: hideSnackbar,
  } = useVisibility();

  const { user } = useAuthStore();
  const { dropdownPackaging, isLoadingPackaging } = usePackagingByCustomer(
    modalProduct?.customerCode!
  );
  const { updatePackaging } = useUpdatePackaging();

  useEffect(() => {
    if (modalProduct.quantity && modalProduct.quantity != 0) {
      setSelectedPackagingDetails((select) => ({
        ...select,
        packagingQuantity: modalProduct.quantity.toString(),
      }));
    }
  }, [modalProduct]);


  const handleModal = (product: ProductReq) => {
    setModalProduct(product);
    showModal();

    setSelectedPackagingDetails({
      packagingCode: modalProduct.codeProduct,
      packagingQuantity: modalProduct.quantity?.toString(),
    });
  };

  const handleSubmit = async () => {
    await updatePackaging({
      codeReq: modalProduct.codeReq,
      codeDetailReq: modalProduct.codeDetailReq,
      mixCode: modalProduct.mixCode,
      batch: modalProduct.batch,
      codeProduct: modalProduct.codeProduct,
      quantity: modalProduct.quantity?.toString(),
      userCode: user?.code!,
    });

    showSnackbar();
    hideModal();
  };

  return (
    <>
      <ScrollView>
        {Object.keys(productsPerBatch).length > 0 ? (
          Object.keys(productsPerBatch).map((batch) => (
            <AccordionProduct
              key={batch}
              accordionTitle={
                <View className="flex-row items-center gap-3">
                  <ThemedChip
                    mode="outlined"
                    text={`Lote ${batch}`}
                    style={{ backgroundColor: "white"}}
                  />

                  <ThemedText
                    variant="h6"
                    className="font-ruda w-5/6"
                  >
                    {productsPerBatch[batch][0].mixName}
                  </ThemedText>
                </View>
              }
            >
              {productsPerBatch[batch].map((product) =>
                product.componentType === COMPONENT_TYPE.fertilizante ? (
                  <ItemAccordionProduct
                    key={product.codeDetailReq}
                    product={product}
                    showModal={() => handleModal(product)}
                  />
                ) : (
                  <ItemAccordionProduct
                    key={product.codeDetailReq}
                    product={product}
                    icon="assistant"
                    showModal={() => handleModal(product)}
                    isPackaging
                  />
                )
              )}

              <ModalProductDetail
                product={modalProduct!}
                visibleModal={isVisibleModal}
                hideModal={hideModal}
              >
                {modalProduct?.quantity !== 0 && (
                  <>
                    <View className="flex-row items-center mb-5">
                      <TextInput
                        keyboardType="numeric"
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontFamily: "Ruda-Bold",
                        }}
                        placeholder="Cantidad (UN)"
                        label="Cantidad (UN)"
                        mode="outlined"
                        value={packagingQuantity}
                        onChangeText={(value) => {
                          setSelectedPackagingDetails((select) => ({
                            ...select,
                            packagingQuantity: value,
                          }));
                        }}
                      />

                      <ThemedButton onPress={handleSubmit} className="px-3">
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={32}
                          color="green"
                        />
                      </ThemedButton>
                    </View>

                    <ThemedDropdown
                      data={dropdownPackaging}
                      isLoading={isLoadingPackaging}
                      selected={packagingCode}
                      onChange={(value) => {
                        setSelectedPackagingDetails((select) => ({
                          ...select,
                          packagingCode: value,
                        }));
                      }}
                      placeholder="Seleccione envase"
                    />
                  </>
                )}
              </ModalProductDetail>
            </AccordionProduct>
          ))
        ) : (
          <Text>No hay datos disponibles</Text>
        )}
      </ScrollView>

      <ThemedSnackbar
        visible={isVisibleSnackbar}
        onDismiss={hideSnackbar}
        message="Producto actualizado correctamente"
        duration={3000}
      />
    </>
  );
};
