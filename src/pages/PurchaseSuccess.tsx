
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { getProductById } from "@/data/products";
import { getPurchaseByProductId, hasUserPurchasedProduct } from "@/services/purchaseService";
import { ArrowRight, Check, Download } from "lucide-react";

export default function PurchaseSuccess() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = id ? getProductById(id) : undefined;
  const purchase = id ? getPurchaseByProductId(id) : undefined;
  const hasPurchased = product ? hasUserPurchasedProduct(product.id) : false;
  
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

  if (!hasPurchased) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">You haven't purchased this product yet.</p>
          <Button onClick={() => navigate(`/product/${product.id}`)}>
            View Product
          </Button>
        </main>
      </div>
    );
  }

  const handleDownload = () => {
    // In a real application, this would trigger a download
    // For demo purposes, we'll just log it
    console.log(`Downloading product: ${product.title}`);
    window.alert(`In a real app, this would download ${product.title}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <Card className="border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Check size={32} />
                </div>
              </div>
              <CardTitle className="text-center text-xl">Purchase Successful!</CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="font-medium text-lg mb-1">{product.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {purchase ? new Date(purchase.purchaseDate).toLocaleDateString() : "Purchase confirmed"}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Access Your Product</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your purchase has been processed successfully. You can now access or download your product.
                </p>
                
                <Button 
                  onClick={handleDownload}
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download Now
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="ghost" onClick={() => navigate("/purchases")}>
                View All Purchases
              </Button>
              <Button variant="outline" onClick={() => navigate("/products")}>
                Browse More Products
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
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
