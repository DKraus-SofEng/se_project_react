# Tripleten Software Engineering Program: Project React

## WTWR (se_project_react)

This is the React.js project of the fulltime Software Engineering program at TripleTen. It is a small React + Vite app that recommends clothing based on current weather temperature of the chosen location.

Fetches current weather from OpenWeather, normalizes it, and shows matching clothing cards.

## Core Technologies

- React 18 (with functional components and hooks)
- JavaScript (ES6+)
- CSS3 (with BEM methodology)
- HTML5
- BEM Methodology

## Libraries/Tools

- React Router DOM (for navigation between pages)
- Vite (build tool and dev server)
- React Context API (for temperature unit state management)

## APIs/Backend

- OpenWeather API (for real-time weather data)
- json-server (for mock backend/database)

## Features

- Fetches current weather from OpenWeather
- Normalizes temperature (F/C) and day/night
- Clothing cards filtered by weather type (hot/warm/cold)
- Temperature unit controlled via a context and a toggle switch
- Modal form for user to add their own clothing items

## Known Issues

### Close Button Visibility

**Issue**:
the white close button icon becomes invisible on clothing items with white/light backgrounds

**Impact**:
users may have difficulty closing the modal when viewing light-colored items

**Recommended Solutions**:

- Use a dark close icon (black or dark gray)
- Add a semi-transparent background to the close button
- Consider using an icon with both light and dark elements (e.g. a shadow)

### Clothing Weather Options

**Issue**: there are only three options for clothing based solely on the weather temperature.

**Impact**: user may not choose appropriate clothing for the weather conditions based on three temperature-related conditions only.

**Recommended Solutions**:

- To truly make the app functional, many more weather conditions, such as rain, wind, and snow would need to be added along with suggested items beyond clothing, such as an umbrella or sunscreen.

## Links

**Figma**

Project is linked to Figma at https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433&p=f&t=THYrkQA0UVHRJ4py-0.

**GitHub**

Link to deployed project on GitHub Pages: https://DKraus-SofEng.github.io/se_project_spots/index.html. _Please note: the complete project has not yet been deployed._

**Project Pitch Video**

You can find the project pitch video at: https://www.loom.com/share/c322926d4fff4ba684481389b3af9d2a
