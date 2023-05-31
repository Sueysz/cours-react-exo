import React, { useState } from 'react';
import { CryptoPrices } from "./components/CryptoPrices";

const App = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <>
      <select onChange={handleCryptoChange}>
        <option value="BTC-EUR">Bitcoin (BTC-EUR)</option>
        <option value="ETH-EUR">Ethereum (ETH-EUR)</option>
        <option value="ADA-EUR">Cardano (ADA-EUR)</option>
        <option value="DOT-EUR">Polkadot (DOT-EUR)</option>
        <option value="CRO-EUR">Cronos (CRO-EUR)</option>
        <option value="MATIC-EUR">Polygon (MATIC-EUR)</option>
      </select>
      {selectedCrypto && <CryptoPrices current={selectedCrypto} />}
    </>
  );
};

export default App;