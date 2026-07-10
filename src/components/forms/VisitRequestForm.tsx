import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../components/ui/Button";
import { VisitSlot } from "../../types/visit";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00", "18:30"];

const MOIS_COURT = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];
const JOURS_COURT = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

function buildNextDays(count: number): { iso: string; label: string; dayLabel: string }[] {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      iso: d.toISOString().slice(0, 10),
      label: `${d.getDate()} ${MOIS_COURT[d.getMonth()]}`,
      dayLabel: JOURS_COURT[d.getDay()],
    });
  }
  return days;
}

interface VisitRequestFormProps {
  onSubmit: (slot: VisitSlot) => void;
  loading?: boolean;
}

export default function VisitRequestForm({ onSubmit, loading = false }: VisitRequestFormProps) {
  const days = buildNextDays(14);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const canSubmit = Boolean(selectedDate && selectedTime);

  return (
    <View>
      <Text className="text-ink text-sm font-semibold mb-3">Choisissez une date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
        {days.map((day) => {
          const selected = selectedDate === day.iso;
          return (
            <TouchableOpacity
              key={day.iso}
              onPress={() => setSelectedDate(day.iso)}
              className={`items-center justify-center w-16 h-20 rounded-xl mr-2 border ${
                selected ? "bg-primary border-primary" : "bg-white border-border"
              }`}
            >
              <Text className={`text-xs ${selected ? "text-white" : "text-muted"}`}>
                {day.dayLabel}
              </Text>
              <Text
                className={`text-sm font-semibold mt-1 ${
                  selected ? "text-white" : "text-ink"
                }`}
              >
                {day.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text className="text-ink text-sm font-semibold mb-3">Choisissez une heure</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {TIME_SLOTS.map((time) => {
          const selected = selectedTime === time;
          return (
            <TouchableOpacity
              key={time}
              onPress={() => setSelectedTime(time)}
              className={`px-4 py-2.5 rounded-full border ${
                selected ? "bg-primary border-primary" : "bg-white border-border"
              }`}
            >
              <Text className={`text-sm font-medium ${selected ? "text-white" : "text-ink"}`}>
                {time}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button
        label="Confirmer la demande de visite"
        disabled={!canSubmit}
        loading={loading}
        onPress={() =>
          selectedDate && selectedTime && onSubmit({ date: selectedDate, time: selectedTime })
        }
      />
    </View>
  );
}
