export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;  // Base price in USD
  imageUrl: string;
  type: 'digital' | 'physical';
  downloadUrl?: string;
}

export interface Purchase {
  id: string;
  productId: string;
  purchaseDate: string;
  amount: number;
  paymentId: string;
}

export type Currency = 'USD' | 'ETB';

export interface CurrencyConfig {
  symbol: string;
  rate: number; // Exchange rate from USD
  code: Currency;
}

export const currencies: Record<Currency, CurrencyConfig> = {
  USD: { symbol: '$', rate: 1, code: 'USD' },
  ETB: { symbol: 'ETB', rate: 55.89, code: 'ETB' }, // Example rate, should be updated regularly
};

export const formatPrice = (price: number, currency: Currency): string => {
  const config = currencies[currency];
  const convertedPrice = price * config.rate;
  
  return `${config.symbol}${convertedPrice.toFixed(2)}`;
};
