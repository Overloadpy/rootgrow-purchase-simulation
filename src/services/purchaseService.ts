
import { Product, Purchase } from "../types/product";

const PURCHASE_HISTORY_KEY = "purchase_history";

export const savePurchase = (product: Product, paymentId: string): Purchase => {
  const purchase: Purchase = {
    id: `purchase_${Date.now()}`,
    productId: product.id,
    purchaseDate: new Date().toISOString(),
    amount: product.price,
    paymentId: paymentId,
  };
  
  // Get existing purchases from localStorage
  const existingPurchasesJSON = localStorage.getItem(PURCHASE_HISTORY_KEY);
  const existingPurchases: Purchase[] = existingPurchasesJSON 
    ? JSON.parse(existingPurchasesJSON) 
    : [];
  
  // Add new purchase
  const updatedPurchases = [...existingPurchases, purchase];
  
  // Save updated purchases to localStorage
  localStorage.setItem(PURCHASE_HISTORY_KEY, JSON.stringify(updatedPurchases));
  
  return purchase;
};

export const getPurchaseHistory = (): Purchase[] => {
  const purchasesJSON = localStorage.getItem(PURCHASE_HISTORY_KEY);
  return purchasesJSON ? JSON.parse(purchasesJSON) : [];
};

export const hasUserPurchasedProduct = (productId: string): boolean => {
  const purchases = getPurchaseHistory();
  return purchases.some(purchase => purchase.productId === productId);
};

export const getPurchaseByProductId = (productId: string): Purchase | undefined => {
  const purchases = getPurchaseHistory();
  return purchases.find(purchase => purchase.productId === productId);
};
