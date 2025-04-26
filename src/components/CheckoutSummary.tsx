
import { Product, formatPrice, Currency } from "@/types/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CheckoutSummaryProps {
  product: Product;
  currency: Currency;
}

export function CheckoutSummary({ product, currency }: CheckoutSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 pb-4">
          <div className="h-16 w-16 rounded overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-muted-foreground">{product.type}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span>{formatPrice(product.price, currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(0, currency)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(product.price, currency)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Secure checkout</p>
        <p>All prices in {currency}</p>
      </CardFooter>
    </Card>
  );
}
