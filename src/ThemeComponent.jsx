import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider'; // Ensure correct import of ThemeContext
import { FaWallet } from 'react-icons/fa'; // Import icons
import { MdOutlineDarkMode } from 'react-icons/md';
import Seed from './Seed';

function ThemeComponent() {
  // Access `dark` and `toggleTheme` from context
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    // Apply the background to the whole page by using a div that wraps the entire page content
    <div className={`${dark ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      <div className="flex justify-between items-center p-4">
        <div className="text-4xl m-4">
          <FaWallet />
        </div>
        {/* Toggle theme button */}
        <button className="text-4xl m-4" onClick={toggleTheme}>
          <MdOutlineDarkMode />
        </button>
      </div>
      <Seed/>
    </div>
  );
}

export default ThemeComponent;
