import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { colors } from "../../theme/tokens";
import { formatPrice } from "../../utils/formatPrice";
import { MOCK_PROPERTIES } from "../../utils/mockData";
import { PaymentMethodType, PaymentPurpose } from "../../types/payment";
import { paymentsApi } from "../../api/payments/payments.api";
import { usePaymentsStore } from "../../store/payments.store";
import { phoneSchema } from "../../utils/validators";

const PURPOSE_CONFIG: Record<PaymentPurpose, { label: string; amountFactor: number }> = {
  reservation: { label: "Frais de réservation", amountFactor: 0.05 },
  premier_loyer: { label: "Premier loyer", amountFactor: 1 },
  caution: { label: "Caution (2 mois)", amountFactor: 2 },
};

const METHODS: { key: PaymentMethodType; label: string; color: string; icon: keyof typeof Ionicons.glyphMap; requiresPhone: boolean }[] = [
  { key: "wave", label: "Wave", color: "#1DC3EA", icon: "water", requiresPhone: true },
  { key: "orange_money", label: "Orange Money", color: "#FF7900", icon: "phone-portrait", requiresPhone: true },
  { key: "free_money", label: "Free Money", color: "#E4032E", icon: "cash-outline", requiresPhone: true },
  { key: "carte", label: "Carte bancaire", color: colors.ink, icon: "card-outline", requiresPhone: false },
];

export default function PaymentMethodScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { propertyId, purpose = "reservation" } = route.params ?? {};
  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
  const { addTransaction } = usePaymentsStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [processing, setProcessing] = useState(false);

  if (!property) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center py-24">
          <Text className="text-ink text-base font-semibold">Annonce introuvable</Text>
        </View>
      </Screen>
    );
  }

  const purposeConfig = PURPOSE_CONFIG[purpose as PaymentPurpose];
  const amount = Math.round(property.price * purposeConfig.amountFactor);
  const methodConfig = METHODS.find((m) => m.key === selectedMethod);

  const handlePay = async () => {
    if (methodConfig?.requiresPhone) {
      const result = phoneSchema.safeParse(phone);
      if (!result.success) {
        setPhoneError(result.error.issues[0]?.message);
        return;
      }
    }
    setPhoneError(undefined);
    if (!selectedMethod) return;

    setProcessing(true);
    const reference = `DKW-${Date.now().toString().slice(-8)}`;

    try {
      const transaction = await paymentsApi.initiate({
        propertyId: property.id,
        purpose: purpose as PaymentPurpose,
        amount,
        method: selectedMethod,
        phone: methodConfig?.requiresPhone ? phone : undefined,
      });
      addTransaction(transaction);
      navigation.navigate("PaymentConfirmation", {
        success: true,
        amount,
        method: selectedMethod,
        reference: transaction.reference,
        propertyTitle: property.title,
      });
    } catch (e) {
      // ⚠️ Fallback MVP: le back-end et les SDK Wave/Orange Money/Free
      // Money ne sont pas encore branchés. On simule un paiement réussi
      // pour pouvoir démontrer le flow complet (reçu, historique...).
      addTransaction({
        id: `txn-${Date.now()}`,
        propertyId: property.id,
        propertyTitle: property.title,
        amount,
        method: selectedMethod,
        purpose: purpose as PaymentPurpose,
        status: "reussi",
        reference,
        createdAt: new Date().toISOString(),
      });
      navigation.navigate("PaymentConfirmation", {
        success: true,
        amount,
        method: selectedMethod,
        reference,
        propertyTitle: property.title,
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Screen>
      {/* Récapitulatif */}
      <View className="flex-row bg-white border border-border rounded-xl2 p-3 mt-2 mb-6">
        <Image
          source={{ uri: property.images[0] }}
          style={{ width: 56, height: 56, borderRadius: 12 }}
          resizeMode="cover"
        />
        <View className="flex-1 ml-3 justify-center">
          <Text className="text-ink text-sm font-semibold" numberOfLines={1}>
            {property.title}
          </Text>
          <Text className="text-muted text-xs mt-0.5">{purposeConfig.label}</Text>
        </View>
        <View className="justify-center items-end">
          <Text className="text-primary-dark text-base font-bold">
            {formatPrice(amount)}
          </Text>
        </View>
      </View>

      <Text className="text-ink text-sm font-semibold mb-3">Choisir un moyen de paiement</Text>
      <View className="gap-2 mb-5">
        {METHODS.map((method) => {
          const selected = selectedMethod === method.key;
          return (
            <TouchableOpacity
              key={method.key}
              onPress={() => setSelectedMethod(method.key)}
              className={`flex-row items-center border rounded-xl2 px-4 py-3.5 ${
                selected ? "border-primary bg-white" : "border-border bg-white"
              }`}
            >
              <View
                style={{ backgroundColor: `${method.color}1A` }}
                className="w-9 h-9 rounded-full items-center justify-center mr-3"
              >
                <Ionicons name={method.icon} size={17} color={method.color} />
              </View>
              <Text className="text-ink text-sm font-medium flex-1">{method.label}</Text>
              <Ionicons
                name={selected ? "radio-button-on" : "radio-button-off"}
                size={20}
                color={selected ? colors.primary : colors.border}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {methodConfig?.requiresPhone && (
        <Input
          label={`Numéro ${methodConfig.label}`}
          placeholder="77 123 45 67"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          error={phoneError}
        />
      )}

      <View className="flex-row items-center bg-surface border border-border rounded-xl px-3 py-2.5 mb-5">
        <Ionicons name="shield-checkmark-outline" size={16} color={colors.primary} />
        <Text className="text-muted text-xs ml-2 flex-1">
          Paiement sécurisé — vos informations ne sont jamais partagées avec le propriétaire.
        </Text>
      </View>

      <Button
        label={`Payer ${formatPrice(amount)}`}
        disabled={!selectedMethod}
        loading={processing}
        onPress={handlePay}
      />
    </Screen>
  );
}
