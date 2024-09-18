import React, { useState } from 'react';
import ThemeProvider from './ThemeProvider';
import {generateMnemonic, mnemonicToEntropy, mnemonicToSeedSync} from 'bip39'



function App() {  

  return (
    <>
      <div>
        <ThemeProvider/>
      </div>
    </>
  );
}

export default App;
