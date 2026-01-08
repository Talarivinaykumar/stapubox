# Font Installation Instructions

To complete the Figma design implementation, you need to:

1. Download Plus Jakarta Sans font family from Google Fonts
2. Place the font files (.ttf) in this directory:
   - PlusJakartaSans-Regular.ttf
   - PlusJakartaSans-Medium.ttf
   - PlusJakartaSans-SemiBold.ttf
   - PlusJakartaSans-Bold.ttf

3. Run: npx react-native-asset
4. Rebuild the app: npm run android

The app will fallback to system fonts if Plus Jakarta Sans is not available.