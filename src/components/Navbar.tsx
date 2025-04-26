
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getPurchaseHistory } from "@/services/purchaseService";

export function Navbar() {
  const purchaseCount = getPurchaseHistory().length;
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">ProductStore</Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            Products
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/purchases">
            <Button variant="outline" size="sm" className="relative">
              <ShoppingCart size={16} className="mr-2" />
              Purchases
              {purchaseCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {purchaseCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
