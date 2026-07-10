import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Chip from "../../components/ui/Chip";
import { HOUSING_TYPES, VILLES, QUARTIERS_DAKAR } from "../../utils/constants";
import { HousingType, PropertyAmenities } from "../../types/property";

const propertySchema = z.object({
  title: z.string().min(5, "5 caractères minimum"),
  description: z.string().min(20, "Décrivez le logement en quelques phrases (20 caractères min)"),
  city: z.string().min(1, "Ville requise"),
  neighborhood: z.string().min(1, "Quartier requis"),
  price: z.string().min(1, "Prix requis"),
  surface: z.string().min(1, "Surface requise"),
  rooms: z.string().min(1, "Nombre de pièces requis"),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export interface PropertyFormSubmitValues extends PropertyFormValues {
  type: HousingType;
  amenities: PropertyAmenities;
}

const AMENITY_OPTIONS: { key: keyof PropertyAmenities; label: string }[] = [
  { key: "meuble", label: "Meublé" },
  { key: "eauIncluse", label: "Eau incluse" },
  { key: "electriciteIncluse", label: "Électricité incluse" },
  { key: "wifi", label: "Wifi" },
  { key: "parking", label: "Parking" },
  { key: "climatisation", label: "Climatisation" },
  { key: "animauxAcceptes", label: "Animaux acceptés" },
];

const DEFAULT_AMENITIES: PropertyAmenities = {
  meuble: false,
  eauIncluse: false,
  electriciteIncluse: false,
  wifi: false,
  parking: false,
  climatisation: false,
  animauxAcceptes: false,
};

interface PropertyFormProps {
  defaultValues?: Partial<PropertyFormSubmitValues>;
  onSubmit: (values: PropertyFormSubmitValues) => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function PropertyForm({
  defaultValues,
  onSubmit,
  loading = false,
  submitLabel = "Continuer",
}: PropertyFormProps) {
  const [type, setType] = useState<HousingType>(defaultValues?.type ?? "studio");
  const [city, setCity] = useState<string>(defaultValues?.city ?? "Dakar");
  const [amenities, setAmenities] = useState<PropertyAmenities>(
    defaultValues?.amenities ?? DEFAULT_AMENITIES
  );

  const { control, handleSubmit, formState } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      city: defaultValues?.city ?? "Dakar",
      neighborhood: defaultValues?.neighborhood ?? "",
      price: defaultValues?.price ? String(defaultValues.price) : "",
      surface: defaultValues?.surface ? String(defaultValues.surface) : "",
      rooms: defaultValues?.rooms ? String(defaultValues.rooms) : "1",
    },
  });

  const toggleAmenity = (key: keyof PropertyAmenities) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const submit = (values: PropertyFormValues) => {
    onSubmit({ ...values, city, type, amenities });
  };

  return (
    <View>
      <Text className="text-ink text-sm font-semibold mb-2">Type de logement</Text>
      <View className="flex-row flex-wrap mb-4">
        {HOUSING_TYPES.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            selected={type === item.key}
            onPress={() => setType(item.key)}
          />
        ))}
      </View>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Titre de l'annonce"
            placeholder="Studio meublé proche mer"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Description"
            placeholder="Décrivez le logement, son environnement, ses conditions..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: "top" }}
            error={formState.errors.description?.message}
          />
        )}
      />

      <Text className="text-ink text-sm font-medium mb-1.5">Ville</Text>
      <View className="flex-row flex-wrap mb-4">
        {VILLES.map((ville) => (
          <Chip key={ville} label={ville} selected={city === ville} onPress={() => setCity(ville)} />
        ))}
      </View>

      <Controller
        control={control}
        name="neighborhood"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Quartier / Adresse"
            placeholder={QUARTIERS_DAKAR[0]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.neighborhood?.message}
          />
        )}
      />

      <View className="flex-row gap-3">
        <View className="flex-1">
          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Prix / mois"
                placeholder="120000"
                keyboardType="numeric"
                suffix="FCFA"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={formState.errors.price?.message}
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="surface"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Surface"
                placeholder="28"
                keyboardType="numeric"
                suffix="m²"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={formState.errors.surface?.message}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="rooms"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Nombre de pièces"
            placeholder="1"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.rooms?.message}
          />
        )}
      />

      <Text className="text-ink text-sm font-semibold mb-2 mt-1">
        Conditions et commodités
      </Text>
      <View className="flex-row flex-wrap mb-6">
        {AMENITY_OPTIONS.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            selected={amenities[item.key]}
            onPress={() => toggleAmenity(item.key)}
          />
        ))}
      </View>

      <Button label={submitLabel} loading={loading} onPress={handleSubmit(submit)} />
    </View>
  );
}
