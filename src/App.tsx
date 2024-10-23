import React, { useState } from 'react';
import CryptoInput from './components/CryptoInput';
import PinnedCryptos from './components/PinnedCryptos';

type CryptoPrice = {
  code: string;
  price: number;
};

const App: React.FC = () => {
  const [cryptoPrice, setCryptoPrice] = useState<CryptoPrice | null>(null);
  const [pinnedCryptos, setPinnedCryptos] = useState<CryptoPrice[]>([]);

  // Handle the selected currency from the input
  const handleSelectCrypto = (currencyCode: string, price: number) => {
    setCryptoPrice({ code: currencyCode, price });
  };

  // Pin the current currency
  const pinCrypto = () => {
    if (cryptoPrice) {
      setPinnedCryptos((prevPinned) => [...prevPinned, cryptoPrice]);
    }
  };

  return (
    <div>
      <h1>Cryptocurrency Price Tracker</h1>
      <CryptoInput onSelectCrypto={handleSelectCrypto} />

      {cryptoPrice && (
        <div>
          <h2>
            {cryptoPrice.code}: ${cryptoPrice.price.toFixed(2)}
          </h2>
          <button onClick={pinCrypto}>Pin this Currency</button>
        </div>
      )}

      <PinnedCryptos pinnedCryptos={pinnedCryptos} />
    </div>
  );
};

export default App;
