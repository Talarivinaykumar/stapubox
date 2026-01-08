# StapuBox - OTP Registration App

A React Native mobile application for OTP-based authentication with SMS auto-read functionality.

## Features

- 📱 Mobile number validation (Indian numbers)
- 📨 OTP sending and verification
- 🔄 OTP resend with cooldown timer
- 📲 SMS auto-read (Android)
- ✅ Auto-submit when OTP is complete
- 🎨 Error highlighting and validation
- 🔙 Change number functionality

## Setup Instructions

### Prerequisites

- Node.js (>=20)
- React Native CLI
- Android Studio (for Android development)
- Java Development Kit (JDK 17)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stapubox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Android Setup**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Start Metro**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_TOKEN=your_api_token_here
```

## API Configuration

The app uses the following APIs:

- **Base URL**: `https://stapubox.com/trial`
- **Send OTP**: `POST /sendOtp`
- **Resend OTP**: `POST /resendOtp?mobile={mobile}`
- **Verify OTP**: `POST /verifyOtp?mobile={mobile}&otp={otp}`

## Project Structure

```
src/
├── api/
│   └── api.js              # API configuration and calls
├── components/
│   └── OtpInput.js         # 4-digit OTP input component
├── navigation/
│   └── AppNavigator.js     # Navigation setup
├── screens/
│   ├── SendOtpScreen.js    # Mobile number input screen
│   ├── VerifyOtpScreen.js  # OTP verification screen
│   └── SuccessScreen.js    # Success confirmation screen
└── utils/
    └── constants.js        # App constants
```

## Key Features Implementation

### SMS Auto-Read (Android)
- Uses `react-native-sms-retriever` library
- Automatically extracts 4-digit OTP from SMS
- Graceful fallback if SMS permissions are denied

### OTP Validation
- Real-time validation with API
- Error highlighting on invalid OTP
- Auto-clear OTP on verification failure

### Mobile Number Validation
- Indian mobile number format (10 digits, starts with 6-9)
- Real-time input validation
- Error states with clear messaging

## Build APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

## Known Issues

1. SMS auto-read requires SMS permissions on Android 6+
2. API token is currently hardcoded (should use environment variables in production)
3. Limited error handling for network failures

## Technical Decisions

1. **React Navigation**: Used for screen navigation with stack navigator
2. **Axios**: For API calls with interceptors for error handling
3. **SMS Retriever**: Android-specific SMS auto-read functionality
4. **State Management**: Local state with React hooks (sufficient for this scope)

## Testing

Run tests with:
```bash
npm test
```

## Dependencies

- React Native 0.83.1
- React Navigation 7.x
- Axios for API calls
- react-native-sms-retriever for SMS auto-read

## License

This project is for assignment purposes.