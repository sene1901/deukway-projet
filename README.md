


deukway-mobile/
│
├── app.json
├── App.tsx
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
│       └── logo.png
│
└── src/
    │
    ├── theme/
    │   └── tokens.ts                    # couleurs, typo, spacing (source de vérité)
    │
    ├── api/                             # appels réseau purs (axios), pas de state
    │   ├── client.ts                    # instance axios + intercepteurs (JWT, refresh)
    │   ├── auth/
    │   │   ├── auth.api.ts              # login, register, otp, refreshToken
    │   │   └── auth.types.ts
    │   ├── properties/
    │   │   ├── properties.api.ts        # search, getById, create, update, delete
    │   │   └── properties.types.ts
    │   ├── favorites/
    │   │   └── favorites.api.ts
    │   ├── visits/
    │   │   └── visits.api.ts            # programmer/confirmer une visite (6.8)
    │   ├── chat/
    │   │   └── chat.api.ts              # messages propriétaire ↔ locataire (6.7)
    │   ├── payments/
    │   │   └── payments.api.ts          # Wave / Orange Money / Free Money (8.3)
    │   ├── contracts/
    │   │   └── contracts.api.ts         # contrats numériques + signature (8.2)
    │   └── notifications/
    │       └── notifications.api.ts
    │
    ├── components/
    │   ├── ui/                          # briques atomiques, sans logique métier
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Chip.tsx
    │   │   ├── Avatar.tsx
    │   │   ├── EmptyState.tsx           # favoris vides, aucun résultat
    │   │   ├── Skeleton.tsx             # placeholders de chargement
    │   │   ├── BottomSheet.tsx
    │   │   └── SegmentedControl.tsx
    │   │
    │   ├── cards/                       # composition ui/ + un type métier
    │   │   ├── PropertyCard.tsx
    │   │   ├── FavoriteCard.tsx
    │   │   ├── ConversationPreview.tsx  # aperçu chat (liste des conversations)
    │   │   ├── VisitSlotCard.tsx        # créneau de visite proposé/confirmé
    │   │   ├── ContractCard.tsx         # contrat signé (historique profil)
    │   │   └── TransactionCard.tsx      # ligne de paiement (admin + profil)
    │   │
    │   ├── forms/                       # écrans complets, react-hook-form + zod
    │   │   ├── LoginForm.tsx
    │   │   ├── RegisterForm.tsx
    │   │   ├── OtpForm.tsx
    │   │   ├── PropertyForm.tsx         # création/édition d'annonce (7.1)
    │   │   ├── VisitRequestForm.tsx     # choix date/heure (6.8)
    │   │   └── FiltersForm.tsx          # filtres avancés (6.4)
    │   │
    │   ├── map/
    │   │   ├── PropertyMap.tsx          # Google Maps / OSM (6.5)
    │   │   └── MapMarker.tsx
    │   │
    │   └── layout/
    │       ├── Screen.tsx               # wrapper SafeArea + padding standard
    │       ├── Header.tsx
    │       └── TabBarIcon.tsx
    │
    ├── screens/
    │   ├── auth/
    │   │   ├── LoginScreen.tsx
    │   │   ├── RegisterScreen.tsx
    │   │   └── OtpScreen.tsx
    │   │
    │   ├── home/
    │   │   ├── HomeScreen.tsx
    │   │   ├── SearchScreen.tsx
    │   │   ├── SearchResultsScreen.tsx 
    │   │   └── PropertyDetailsScreen.tsx
    │   │
    │   ├── favorites/
    │   │   └── FavoritesScreen.tsx
    │   │
    │   ├── chat/
    │   │   ├── ConversationsListScreen.tsx
    │   │   └── ChatScreen.tsx
    │   │
    │   ├── visits/
    │   │   ├── ScheduleVisitScreen.tsx
    │   │   └── MyVisitsScreen.tsx
    │   │
    │   ├── payments/
    │   │   ├── PaymentMethodScreen.tsx
    │   │   └── PaymentConfirmationScreen.tsx
    │   │
    │   ├── contracts/
    │   │   ├── ContractPreviewScreen.tsx
    │   │   └── SignatureScreen.tsx
    │   │
    │   ├── profile/
    │   │   ├── ProfileScreen.tsx
    │   │   ├── EditProfileScreen.tsx
    │   │   ├── SearchHistoryScreen.tsx
    │   │   └── MyContractsScreen.tsx
    │   │
    │   ├── owner/
    │   │   ├── MyProperties.tsx
    │   │   ├── CreateProperty.tsx
    │   │   ├── EditProperty.tsx
    │   │   ├── PropertyMediaScreen.tsx  # photos/vidéos/visite virtuelle (7.2, 8.4)
    │   │   └── OwnerRequestsScreen.tsx  # visites + messages reçus (7.4)
    │   │
    │   └── notifications/
    │       └── NotificationsScreen.tsx
    │
    ├── navigation/
    │   ├── RootNavigator.tsx            # switch Auth / App selon état connecté
    │   ├── AuthNavigator.tsx
    │   ├── MainTabNavigator.tsx         # Accueil / Recherche / Favoris / Messages / Profil
    │   ├── OwnerNavigator.tsx           # stack dédiée propriétaire
    │   └── types.ts                     # typage des routes (RootStackParamList...)
    │
    ├── services/
    │   ├── notifications.service.ts     # expo-notifications, push tokens
    │   ├── geolocation.service.ts
    │   ├── storage.service.ts           # wrapper SecureStore (tokens)
    │   └── analytics.service.ts
    │
    ├── store/                           # zustand
    │   ├── auth.store.ts
    │   ├── favorites.store.ts
    │   ├── filters.store.ts
    │   └── notifications.store.ts
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useProperties.ts             # wrap react-query autour de api/properties
    │   ├── useFavorites.ts
    │   ├── useDebounce.ts
    │   └── useLocation.ts
    │
    ├── types/
    │   ├── property.ts
    │   ├── user.ts
    │   ├── visit.ts
    │   ├── contract.ts
    │   └── payment.ts
    │
    └── utils/
        ├── formatPrice.ts               # FCFA, format tabulaire
        ├── validators.ts                # regex téléphone SN, etc.
        ├── dateHelpers.ts
        └── constants.ts                 # villes, quartiers, types de logement


Création du projet
npx create-expo-app deukway-mobile -t expo-template-blank-typescript
cd deukway-mobile
Installer les dépendances :

npm install nativewind tailwindcss
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens
npm install react-native-safe-area-context
npm install zustand
npm install @tanstack/react-query
npm install axios
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
npm install expo-image-picker
npm install react-native-maps

Initialiser Tailwind :
npx tailwindcss init