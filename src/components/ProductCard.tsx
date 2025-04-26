
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product, formatPrice, Currency } from "@/types/product";
import { hasUserPurchasedProduct } from "@/services/purchaseService";
import { Check, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  currency: Currency;
}

export function ProductCard({ product, currency }: ProductCardProps) {
  const navigate = useNavigate();
  const alreadyPurchased = hasUserPurchasedProduct(product.id);

  const handleBuyClick = () => {
    navigate(`/checkout/${product.id}`);
  };

  const handleViewProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.title}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{formatPrice(product.price, currency)}</span>
          {alreadyPurchased && (
            <span className="text-green-600 flex items-center text-xs font-medium">
              <Check size={14} className="mr-1" />
              Purchased
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleViewProductClick}>
          View Details
        </Button>
        {alreadyPurchased ? (
          <Button onClick={() => navigate(`/success/${product.id}`)}>
            Access
          </Button>
        ) : (
          <Button onClick={handleBuyClick}>
            <ShoppingCart size={16} className="mr-2" />
            Buy Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
