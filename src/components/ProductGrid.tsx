
import { ProductCard } from "@/components/ProductCard";
import { Product, Currency } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  currency: Currency;
}

export function ProductGrid({ products, currency }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} currency={currency} />
      ))}
    </div>
  );
}
