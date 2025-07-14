# Online School Mobile App

A cross-platform mobile application for online learning built with React Native and Expo.

## Features

- **User Authentication**: Email/password registration and login
- **Course Management**: Browse, search, and enroll in courses
- **Video Lessons**: Stream video content with native controls
- **Assessments**: Multiple-choice quizzes with instant feedback
- **Progress Tracking**: Monitor learning progress and achievements
- **Bookmarks**: Save favorite courses for easy access
- **Responsive Design**: Optimized for phones and tablets

## Technology Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation 6
- **Video Playback**: Expo AV
- **Storage**: AsyncStorage
- **API**: Axios for HTTP requests
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OnlineSchoolApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on device/simulator:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on physical device

## Project Structure

```
src/
├── components/          # Reusable UI components
├── navigation/          # Navigation configuration
├── screens/            # Screen components
├── services/           # API services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## API Integration

The app connects to a backend API with the following endpoints:

- **Authentication**: `/auth/login`, `/auth/register`
- **Courses**: `/courses`, `/courses/:id`, `/courses/:id/enroll`
- **Lessons**: `/lessons/:id`, `/lessons/:id/complete`
- **Assessments**: `/lessons/:id/questions`, `/lessons/:id/submit-assessment`
- **User Progress**: `/users/progress`

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web

## Configuration

Update the API base URL in `src/services/api.ts`:

```typescript
const BASE_URL = 'https://your-api-domain.com/v1';
```

## Building for Production

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

## Features Implementation Status

- ✅ User Authentication
- ✅ Course Listing and Details
- ✅ Lesson Content with Video Playback
- ✅ Assessment System
- ✅ Progress Tracking
- ✅ Bookmarks
- ✅ User Profile
- ✅ Error Handling
- ✅ Loading States

## Future Enhancements

- Push notifications for course updates
- Offline video downloads
- Dark mode support
- Social features and discussion forums
- Multi-language support
- Advanced analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.