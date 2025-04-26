
import { Navbar } from "@/components/Navbar";
import { getPurchaseHistory } from "@/services/purchaseService";
import { getProductById } from "@/data/products";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";

export default function PurchaseHistory() {
  const purchases = getPurchaseHistory();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Purchases</h1>
        
        {purchases.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No purchases yet</h2>
            <p className="text-muted-foreground mb-6">You haven't made any purchases yet.</p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase) => {
              const product = getProductById(purchase.productId);
              
              if (!product) return null;
              
              return (
                <div key={purchase.id} className="border rounded-lg p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Purchased {formatDistance(new Date(purchase.purchaseDate), new Date(), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="hidden md:flex items-center text-sm text-green-600">
                    <CheckCircle size={16} className="mr-1" /> 
                    Completed
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${purchase.amount.toFixed(2)}</p>
                    <Link to={`/success/${product.id}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        Access
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ProductStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
