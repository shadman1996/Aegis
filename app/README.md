# Nexara App — Flutter Cross-Platform
# Android · iOS · macOS · Windows · Linux

## Structure
```
app/
├── lib/
│   ├── core/
│   │   ├── api/             ← Dio HTTP client + interceptors
│   │   │   ├── api_client.dart
│   │   │   └── interceptors/
│   │   │       ├── auth_interceptor.dart   ← Attach JWT token
│   │   │       ├── retry_interceptor.dart  ← Auto-retry on 5xx
│   │   │       └── log_interceptor.dart    ← Dev logging
│   │   ├── auth/
│   │   │   ├── firebase_auth_service.dart
│   │   │   ├── biometric_auth_service.dart ← Face ID / Touch ID
│   │   │   └── session_manager.dart
│   │   ├── notifications/
│   │   │   ├── notification_service.dart   ← FCM + local notifications
│   │   │   └── notification_handler.dart   ← Deep link routing
│   │   ├── security/
│   │   │   ├── certificate_pinning.dart    ← SSL pinning
│   │   │   └── jailbreak_detector.dart     ← Root/jailbreak check
│   │   └── theme/
│   │       ├── app_theme.dart              ← Nexara dark theme
│   │       ├── colors.dart
│   │       └── typography.dart
│   │
│   ├── features/
│   │   ├── auth/            ← Login, MFA, biometric setup
│   │   ├── dashboard/       ← Home: agent status grid
│   │   ├── notifications/   ← Notification centre + approvals
│   │   ├── agents/          ← Agent store + config screens
│   │   ├── activity/        ← Real-time agent activity feed
│   │   ├── analytics/       ← Charts + performance metrics
│   │   ├── billing/         ← Subscription + invoice management
│   │   ├── support/         ← FAQ, chat support, tutorials
│   │   └── settings/        ← Profile, team, MFA, security
│   │
│   ├── shared/
│   │   ├── widgets/         ← Reusable UI components
│   │   │   ├── agent_card.dart
│   │   │   ├── notification_card.dart
│   │   │   ├── approval_card.dart    ← Approve/Reject with deadline
│   │   │   ├── nexara_button.dart    ← iOS-style tap feedback
│   │   │   ├── nexara_text_field.dart
│   │   │   └── loading_skeleton.dart
│   │   ├── models/          ← Dart data models
│   │   └── utils/
│   │       ├── date_utils.dart
│   │       └── format_utils.dart
│   │
│   ├── router/
│   │   └── app_router.dart  ← GoRouter: deep linking + back navigation
│   │
│   └── main.dart
│
├── android/
├── ios/
├── macos/
├── windows/
├── linux/
└── pubspec.yaml
```

## iOS-style UX Principles Applied
- Every tap has haptic feedback (`HapticFeedback.lightImpact()`)
- Back navigation: swipe from left edge (iOS) or system back (Android)
- Logo tap: always returns to home/dashboard
- Smooth page transitions: slide-in from right, slide-out to left
- Bottom sheet modals (not popup dialogs) on mobile
- Skeleton loading screens (not spinners) while data loads
- Error states with retry buttons (never blank screens)
- Inline validation (not after submit) on all forms
- Biometric prompt on app resume (optional, user-configured)

## Run
```bash
flutter pub get
flutter run -d android
flutter run -d ios
flutter run -d macos
flutter run -d windows
flutter run -d linux
flutter run -d chrome      # Web preview
```

## Build
```bash
flutter build apk --release         # Android APK
flutter build appbundle --release   # Android App Bundle (Play Store)
flutter build ipa --release         # iOS (requires macOS + Xcode)
flutter build macos --release       # macOS app
flutter build windows --release     # Windows exe
flutter build linux --release       # Linux binary
```
