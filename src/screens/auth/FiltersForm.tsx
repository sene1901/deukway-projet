import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../components/ui/Input";
import Chip from "../../components/ui/Chip";
import { HOUSING_TYPES } from "../../utils/constants";
import { useFiltersStore, DEFAULT_FILTERS } from "../../store/filters.store";
import { HousingType } from "../../types/property";

const filtersSchema = z
  .object({
    priceMin: z.string().optional(),
    priceMax: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.priceMin ||
      !data.priceMax ||
      Number(data.priceMax) >= Number(data.priceMin),
    {
      message: "Le prix max doit être supérieur au prix min",
      path: ["priceMax"],
    }
  );

type FiltersFormValues = z.infer<typeof filtersSchema>;

const AMENITY_OPTIONS: { key: keyof typeof DEFAULT_FILTERS; label: string }[] = [
  { key: "meuble", label: "Meublé" },
  { key: "eauIncluse", label: "Eau incluse" },
  { key: "electriciteIncluse", label: "Électricité incluse" },
  { key: "wifi", label: "Wifi" },
  { key: "parking", label: "Parking" },
  { key: "climatisation", label: "Climatisation" },
  { key: "animauxAcceptes", label: "Animaux acceptés" },
];

interface FiltersFormProps {
  onApply: () => void;
}

export default function FiltersForm({ onApply }: FiltersFormProps) {
  const { filters, setFilters, resetFilters } = useFiltersStore();

  const { control, handleSubmit, formState } = useForm<FiltersFormValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      priceMin: filters.priceMin ? String(filters.priceMin) : "",
      priceMax: filters.priceMax ? String(filters.priceMax) : "",
    },
  });

  const toggleType = (type: HousingType) => {
    setFilters({ type: filters.type === type ? null : type });
  };

  const toggleAmenity = (key: keyof typeof DEFAULT_FILTERS) => {
    setFilters({ [key]: !filters[key] } as any);
  };

  const onSubmit = (values: FiltersFormValues) => {
    setFilters({
      priceMin: values.priceMin ? Number(values.priceMin) : null,
      priceMax: values.priceMax ? Number(values.priceMax) : null,
    });
    onApply();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="pt-4" style={{ maxHeight: 480 }}>
      {/* Type de logement */}
      <Text className="text-ink text-sm font-semibold mb-2">Type de logement</Text>
      <View className="flex-row flex-wrap mb-4">
        {HOUSING_TYPES.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            selected={filters.type === item.key}
            onPress={() => toggleType(item.key)}
          />
        ))}
      </View>

      {/* Prix */}
      <Text className="text-ink text-sm font-semibold mb-2">Budget (FCFA / mois)</Text>
      <View className="flex-row gap-3">
        <View className="flex-1">
          <Controller
            control={control}
            name="priceMin"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Min"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                suffix="FCFA"
              />
            )}
          />
        </View>
        <View className="flex-1">
          <Controller
            control={control}
            name="priceMax"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Max"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                suffix="FCFA"
                error={formState.errors.priceMax?.message}
              />
            )}
          />
        </View>
      </View>

      {/* Commodités */}
      <Text className="text-ink text-sm font-semibold mb-2 mt-1">Commodités</Text>
      <View className="flex-row flex-wrap mb-2">
        {AMENITY_OPTIONS.map((item) => (
          <Chip
            key={item.key}
            label={item.label}
            selected={Boolean(filters[item.key])}
            onPress={() => toggleAmenity(item.key)}
          />
        ))}
      </View>

      <View className="flex-row gap-3 mt-5 mb-6">
        <TouchableOpacity
          onPress={() => resetFilters()}
          className="flex-1 border border-border rounded-xl py-3.5 items-center"
        >
          <Text className="text-ink font-semibold text-sm">Réinitialiser</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="flex-1 bg-primary rounded-xl py-3.5 items-center"
        >
          <Text className="text-white font-semibold text-sm">Appliquer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
