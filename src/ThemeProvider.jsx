import React, { useState } from 'react';
import ThemeComponent from './ThemeComponent';
import Seed from './Seed';

// Export the ThemeContext so that it can be used by other components
export const ThemeContext = React.createContext();

function ThemeProvider() {
  const [dark, setDarkTheme] = useState(true); // Managing the dark mode state

  // Function to toggle the theme
  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  }

  return (
    // Provide the `dark` state and `toggleTheme` function to children
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <ThemeComponent />
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
