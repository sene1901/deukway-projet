import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Entrez votre email ou numéro de téléphone"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  onForgotPassword?: () => void;
}

export default function LoginForm({
  onSubmit,
  loading = false,
  onForgotPassword,
}: LoginFormProps) {
  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
  });

  return (
    <View>
      <Controller
        control={control}
        name="identifier"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email ou téléphone"
            placeholder="77 123 45 67 ou nom@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.identifier?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Mot de passe"
            placeholder="••••••••"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={formState.errors.password?.message}
          />
        )}
      />

      <TouchableOpacity onPress={onForgotPassword} className="self-end mb-5 -mt-2">
        <Text className="text-primary text-xs font-medium">
          Mot de passe oublié ?
        </Text>
      </TouchableOpacity>

      <Button
        label="Se connecter"
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
