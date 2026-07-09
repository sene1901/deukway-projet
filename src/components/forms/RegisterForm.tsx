import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Chip from "../../components/ui/Chip";
import { VILLES } from "../../utils/constants";
import { phoneSchema, passwordSchema } from "../../utils/validators";
import { colors } from "../../theme/tokens";

const registerSchema = z.object({
  fullName: z.string().min(2, "Nom trop court"),
  phone: phoneSchema,
  city: z.string().min(1, "Choisissez votre ville"),
  password: passwordSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  loading?: boolean;
}

export default function RegisterForm({ onSubmit, loading = false }: RegisterFormProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Dakar");

  const { control, handleSubmit, formState, setValue } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", city: "Dakar", password: "" },
  });

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setValue("city", city);
  };

  return (
    <View>
      {/* Photo de profil — optionnelle au MVP (7.2 gère les médias annonces,
          ici c'est juste l'avatar utilisateur, cf. 6.1) */}
      <TouchableOpacity className="self-center mb-5 items-center">
        <View className="w-20 h-20 rounded-full bg-white border-2 border-dashed border-border items-center justify-center">
          <Ionicons name="camera-outline" size={22} color={colors.muted} />
        </View>
        <Text className="text-muted text-xs mt-2">Ajouter une photo</Text>
      </TouchableOpacity>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nom complet"
            placeholder="Awa Diop"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.fullName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Téléphone"
            placeholder="77 123 45 67"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.phone?.message}
          />
        )}
      />

      <Text className="text-ink text-sm font-medium mb-1.5">Ville</Text>
      <View className="flex-row flex-wrap mb-4">
        {VILLES.map((ville) => (
          <Chip
            key={ville}
            label={ville}
            selected={selectedCity === ville}
            onPress={() => handleCitySelect(ville)}
          />
        ))}
      </View>

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Mot de passe"
            placeholder="6 caractères minimum"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.password?.message}
          />
        )}
      />

      <Button label="Créer mon compte" loading={loading} onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
