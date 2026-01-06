# Tripleten Software Engineering Program: Project React

## WTWR (What to Wear)

This is a React + Vite app that recommends clothing based on the current weather for the user's location. It is an educational project of the fulltime Software Engineering program at TripleTen.

## Features

- Fetches real-time weather from OpenWeather API
- Normalizes temperature (F/C) and day/night
- Recommends clothing cards filtered by weather type (hot/warm/cold)
- Temperature unit controlled via a context and a toggle switch
- User can add their own clothing items via a modal form
- Responsive design for desktop and mobile

## Core Technologies / Tech Stack

- React 18 (functional components & hooks)
- Vite (build tool & dev server)
- JavaScript (ES6+)
- CSS3 (BEM methodology)
- React Router DOM (routing)
- React Context API (state management)
- HTML5

## APIs / Backend

- OpenWeather API (real-time weather data)
- WTWR Express backend ([se_project_express](https://github.com/DKraus-SofEng/se_project_express))

## Backend Integration

This app requires the WTWR Express backend to provide user, clothing, and weather data.

- By default, the frontend expects the backend at `http://localhost:3001` (update API URL in your config if needed).
- Follow the setup instructions in the backend repo to run the backend locally.

## How to Run

1. Start the backend server (see backend README for details)
2. Start the frontend:
   - Clone the repo
   - Install dependencies: `npm install`
   - Start the dev server: `npm run dev`
   - App runs at http://localhost:5173

## Testing

This project uses **Vitest** and **React Testing Library** for unit and integration tests.

- All core components (App, RegisterModal, LoginModal, Sidebar) have basic render and interaction tests.
- API error handling and loading states are tested for Sidebar.
- Context and router providers are mocked for isolated component tests.

### How to Run Tests

```
npm run test
```

- All tests are located in the `src/tests/` folder.
- Matchers from `@testing-library/jest-dom` are enabled for robust assertions.

## Known Issues

### Clothing Weather Options

**Issue**: There are only three options for clothing based solely on the weather temperature.

**Impact**: User may not choose appropriate clothing for the weather conditions based on three temperature-related conditions only.

**Recommended Solutions**:

- Add more weather conditions (rain, wind, snow, etc.) and suggest items beyond clothing (umbrella, sunscreen, etc.)

### Location

**Issue**: The app does not automatically detect and use the user’s location to fetch weather data. Users must manually select or enter their location.

**Impact**: Weather and clothing recommendations may not be accurate or relevant unless the user sets their location each time.

**Recommended Solutions**:

- Integrate browser geolocation API to automatically detect the user’s location.
- Optionally, allow users to set a default location in their profile.
- Add a fallback or permission request if the user denies location access.

## Links

- **Figma**: [Design][(https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=AU8kFAxDCsvKCeJI-0](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=AU8kFAxDCsvKCeJI-0)

- **GitHub Pages**: [Deployed Project](https://DKraus-SofEng.github.io/se_project_react/index.html) _(Project not yet fully deployed)_

- **Project Pitch Video**: [Watch here](https://www.loom.com/share/c322926d4fff4ba684481389b3af9d2a)

- **Backend Repo**: [se_project_express](https://github.com/DKraus-SofEng/se_project_express)

## Deployment

- Production backend API: https://api.wtwr.bot.nu
- For local development, the frontend expects the backend at `http://localhost:3001`
- Update the API URL in your frontend config to switch between local and production
