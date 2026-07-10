import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../components/layout/Screen";
import Button from "../../components/ui/Button";
import TransactionCard from "../../components/cards/TransactionCard";
import { colors } from "../../theme/tokens";
import { formatPrice } from "../../utils/formatPrice";
import { usePaymentsStore } from "../../store/payments.store";
import { PaymentMethodType } from "../../types/payment";

const METHOD_LABELS: Record<PaymentMethodType, string> = {
  wave: "Wave",
  orange_money: "Orange Money",
  free_money: "Free Money",
  carte: "Carte bancaire",
};

export default function PaymentConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { success, amount, method, reference, propertyTitle } = route.params ?? {};
  const { transactions } = usePaymentsStore();

  const otherTransactions = transactions.filter((t) => t.reference !== reference).slice(0, 3);

  const handleShareReceipt = () => {
    Share.share({
      message: `Reçu Deukway\n${propertyTitle}\nMontant: ${formatPrice(amount)}\nMéthode: ${METHOD_LABELS[method as PaymentMethodType]}\nRéférence: ${reference}`,
    });
  };

  return (
    <Screen>
      <View className="items-center mt-6 mb-8">
        <View
          className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${
            success ? "bg-primary" : "bg-danger"
          }`}
        >
          <Ionicons name={success ? "checkmark" : "close"} size={30} color="white" />
        </View>
        <Text className="text-ink text-lg font-bold text-center">
          {success ? "Paiement réussi" : "Échec du paiement"}
        </Text>
        <Text className="text-muted text-sm text-center mt-1">
          {success
            ? "Votre transaction a bien été prise en compte."
            : "Veuillez réessayer ou choisir un autre moyen de paiement."}
        </Text>
      </View>

      {/* Reçu */}
      <View className="bg-white border border-border rounded-xl2 p-4 mb-6">
        <View className="flex-row justify-between py-2">
          <Text className="text-muted text-xs">Logement</Text>
          <Text className="text-ink text-xs font-medium" numberOfLines={1}>
            {propertyTitle}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-t border-border">
          <Text className="text-muted text-xs">Montant</Text>
          <Text className="text-ink text-sm font-bold">{formatPrice(amount)}</Text>
        </View>
        <View className="flex-row justify-between py-2 border-t border-border">
          <Text className="text-muted text-xs">Moyen de paiement</Text>
          <Text className="text-ink text-xs font-medium">
            {METHOD_LABELS[method as PaymentMethodType]}
          </Text>
        </View>
        <View className="flex-row justify-between py-2 border-t border-border">
          <Text className="text-muted text-xs">Référence</Text>
          <Text className="text-ink text-xs font-medium">{reference}</Text>
        </View>
      </View>

      <View className="gap-3 mb-8">
        <Button
          label="Partager le reçu"
          variant="outline"
          icon={<Ionicons name="share-outline" size={16} color={colors.primary} />}
          onPress={handleShareReceipt}
        />
        <Button label="Retour à l'accueil" onPress={() => navigation.navigate("Main")} />
      </View>

      {otherTransactions.length > 0 && (
        <>
          <Text className="text-ink font-semibold text-sm mb-3">Paiements récents</Text>
          <View className="gap-2">
            {otherTransactions.map((t) => (
              <TransactionCard key={t.id} transaction={t} />
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}
