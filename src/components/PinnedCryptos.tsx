import React from 'react';

type PinnedCryptosProps = {
  pinnedCryptos: { code: string; price: number }[];
};

const PinnedCryptos: React.FC<PinnedCryptosProps> = ({ pinnedCryptos }) => {
  return (
    <div>
      <h3>Pinned Cryptocurrencies</h3>
      <ul>
        {pinnedCryptos.map((crypto) => (
          <li key={crypto.code}>
            {crypto.code}: ${crypto.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PinnedCryptos;
