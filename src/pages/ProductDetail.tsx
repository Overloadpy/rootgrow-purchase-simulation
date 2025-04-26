
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { getProductById } from "@/data/products";
import { hasUserPurchasedProduct } from "@/services/purchaseService";
import { ShoppingCart, Check, Package } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = id ? getProductById(id) : undefined;
  const alreadyPurchased = product ? hasUserPurchasedProduct(product.id) : false;
  
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
  
  const handleBuyClick = () => {
    navigate(`/checkout/${product.id}`);
  };
  
  const handleAccessClick = () => {
    navigate(`/success/${product.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product image */}
          <div className="rounded-lg overflow-hidden border">
            <img 
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                {alreadyPurchased && (
                  <span className="ml-4 text-green-600 flex items-center text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
                    <Check size={14} className="mr-1" />
                    Already purchased
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Package size={16} className="mr-2" />
                {product.type === "digital" ? "Digital Download" : "Physical Product"}
              </div>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {alreadyPurchased ? (
                <Button size="lg" onClick={handleAccessClick} className="w-full md:w-auto">
                  <Check size={16} className="mr-2" />
                  Access Product
                </Button>
              ) : (
                <Button size="lg" onClick={handleBuyClick} className="w-full md:w-auto">
                  <ShoppingCart size={16} className="mr-2" />
                  Buy Now
                </Button>
              )}
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
