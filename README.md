## Questify

Questify is built using React-Native for Android and iOS and Gemini AI. A novel mobile application designed to revolutionize children's learning experiences by transforming education into engaging, real-world quests. The app addresses the challenge of disengagement and frustration often associated with traditional learning methods by incorporating interactive quests that encourage children to explore their surroundings while acquiring valuable knowledge. Through completing quests and earning badges, children are motivated to learn and track their progress, fostering a sense of achievement and excitement for discovery. This innovative approach aims to ignite children's natural curiosity and transform learning into an unforgettable adventure.

Demo Video: https://www.youtube.com/watch?v=Q1ML6OnbRsc&ab_channel=Arjun

## Installation

Clone the Repository: Start by cloning the repository to your local machine using the following command:

`git clone https://github.com/Amruthamsh/learning-app.git`

Navigate to the Project Directory: Move into the directory of the cloned repository:

`cd learning-app`

## Setting up the Project Environment 

Ensure you have Node.js and npm installed on your system before running the installation command. You can download and install them from the official Node.js website: https://nodejs.org. (ignore if already installed)

Install expo client in your system (ignore if already installed)

`npm install -g expo-cli`

Install Dependencies: Install both regular dependencies and development dependencies using npm. This includes packages required for running the project and additional packages used for development purposes:

`npm install`

## Environment Variables

Add .env file to the root directory of the project

Content of .env file

```
# change the API_KEY with your api key

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
NEWS_API_KEY=YOUR_NEWS_API_KEY
NEWS_API_ENDPOINT="https://newsapi.org/v2/top-headlines"
NEWS_API_COUNTRY="in"
```

## Running the App

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

`npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

`npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

`npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

`npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:
