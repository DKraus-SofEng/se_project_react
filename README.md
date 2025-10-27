# Weather Wardrobe (se_project_react)

A small React + Vite app that recommends clothing based on current weather. Fetches current weather from OpenWeather, normalizes it, and shows matching clothing cards.

## Features

- Fetches current weather from OpenWeather (see `src/utils/weatherApi.js`)
- Normalizes temperature (F/C) and day/night
- Weather icon and alt text selected from `src/utils/constants.js`
- Clothing cards filtered by weather type (hot/warm/cold)
- Temperature unit controlled via a context and a toggle switch
- Modal form for user to add their own clothing items

## Quick start (Windows / bash)

1. Install dependencies

   npm install

2. Start dev server

   npm run dev

3. Open in the browser (Vite will show the local URL in terminal)

4. Build for production

   npm run build

5. Preview the production build

   npm run preview

## Project structure (important files)

- `src/components/App/App.jsx` — top-level app, fetches weather, provides context
- `src/components/App/Main/Main.jsx` — main page, renders `WeatherCard` and filtered `ItemCard`s
- `src/components/App/Main/WeatherCard/WeatherCard.jsx` — displays icon + temperature
- `src/components/App/ToggleSwitch/ToggleSwitch.css` — toggle styles
- `src/utils/weatherApi.js` — fetch + parse weather data (returns temp object with F/C, timeOfDay, weatherCondition)
- `src/utils/constants.js` — image map and other constants
- `src/utils/ClothingItems.js` — default clothing items and their `weather` tag
- `src/contexts/CurrentTemperatureUnitContext.js` — temperature unit provider and hook

## Configuration

- API and defaults are located in `src/utils/constants.js` and `src/utils/weatherApi.js`. If you need to change API keys or coordinates, edit those files.

## How filtering works

- The main page computes a weather type (hot/warm/cold) from the API temperature and filters `defaultClothingItems` by the item's `weather` property or any numeric min/max if present.
- Thresholds are defined in the app (Fahrenheit by default in `App.jsx`) — if you want one canonical source of thresholds, create a small util and import it in both places.

## Styling / interactions

- The toggle uses CSS transitions on transform for smooth animation. See `src/components/App/ToggleSwitch/ToggleSwitch.css` if you want to adjust timing or hover behavior.
- Radio labels in the add-garment modal change color when the radio is checked via CSS adjacent-sibling selectors in `src/components/App/ItemModal/ItemModal.css`.

## Troubleshooting

- If CSS changes don't appear, save the file and hard-refresh the browser (Ctrl+F5) or restart the dev server.
- Verify the DOM order for sibling selectors (`+` requires immediate sibling). Use DevTools to inspect which CSS rule is active.
- If the weather icons don't appear, check `src/utils/constants.js` keys and the normalized `weatherCondition` returned by `weatherApi.js`.

## Tests & linting

- If you have ESLint or tests configured, run:

  npm run lint
  npm test

(If those scripts are missing, add them to `package.json`.)

## Contributing

- Keep UI changes isolated to components and prefer transform-based animations for performance.
- Centralize unit/threshold logic in a small util so App and Main use the same rules.

## License

This repository is for learning and demonstration purposes.

## Demo

Live demo: https://DKraus-SofEng.github.io/se_project_react/index.html
