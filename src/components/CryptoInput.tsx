import React, { useState, useEffect } from 'react';

type CryptoInputProps = {
  onSelectCrypto: (currencyCode: string, price: number) => void;
};

const CryptoInput: React.FC<CryptoInputProps> = ({ onSelectCrypto }) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  // Fetch the available cryptos from the API
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        const currencyCodes = Object.keys(data.bpi)
        setCurrencies(currencyCodes);  // Set available cryptos
      } catch (error) {
        console.error('Error fetching available cryptos:', error);
      }
    };

    fetchCryptos();
  }, []);

  // Fetch the selected crypto price from the API
  const fetchCryptoPrice = async (currencyCode: string) => {
    try {
      const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`);
      const data = await response.json();
      const currencyDetails = data.bpi[currencyCode]
      onSelectCrypto(currencyDetails.code, currencyDetails.rate_float);  // Use the fetched price
    } catch (error) {
      console.error('Error fetching crypto price:', error);
    }
  };

  // Handle currency selection
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    setSelectedCurrency(selectedCode);
    fetchCryptoPrice(selectedCode);  // Fetch the price for the selected currency
  };

  return (
    <div>
      <h3>Select a Currency</h3>
      <select value={selectedCurrency} onChange={handleSelectChange}>
        <option value="">Select a Currency</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CryptoInput;
