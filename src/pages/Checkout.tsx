import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { CheckoutSummary } from "@/components/CheckoutSummary";
import { getProductById } from "@/data/products";
import { initiatePayment, handlePaymentSuccess } from "@/services/paymentService";
import { savePurchase } from "@/services/purchaseService";
import { sendPurchaseConfirmationEmail } from "@/services/emailService";
import { Currency, formatPrice } from "@/types/product";

export default function Checkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currency] = useState<Currency>('USD'); // Default to USD for payment processing
  
  const product = id ? getProductById(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-muted-foreground">Sorry, we couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </main>
      </div>
    );
  }

  const handlePayClick = async () => {
    setIsProcessing(true);
    
    try {
      // Step 1: Process payment
      const paymentResult = await initiatePayment(product);
      
      // Step 2: Handle success
      const success = await handlePaymentSuccess(paymentResult, product);
      
      if (success && paymentResult.paymentId) {
        // Step 3: Save purchase
        const purchase = savePurchase(product, paymentResult.paymentId);
        
        // Step 4: Send confirmation email
        sendPurchaseConfirmationEmail(product, purchase);
        
        // Step 5: Redirect to success page
        navigate(`/success/${product.id}`);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <div className="border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Payment Information</h2>
                
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a demo checkout. In a real application, this would include payment form fields.
                  </p>
                  
                  <div className="p-4 bg-muted rounded-md text-sm">
                    <p>Demo Mode: Click "Pay Now" to simulate successful payment</p>
                  </div>
                </div>
                
                {product && (
                  <Button 
                    onClick={handlePayClick} 
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(product.price, currency)}`}
                  </Button>
                )}
              </div>
            </div>
            
            <div className="md:col-span-2">
              {product && <CheckoutSummary product={product} currency={currency} />}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ProductStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
