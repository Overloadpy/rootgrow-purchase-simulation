
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { Currency, currencies } from "@/types/product";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Products() {
  const [currency, setCurrency] = useState<Currency>('USD');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Explore Our Digital Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium digital tools and resources to help you build amazing projects.
            </p>
          </div>
          <div className="w-32">
            <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currencies).map(([code, config]) => (
                  <SelectItem key={code} value={code}>
                    {config.symbol} {code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <ProductGrid products={products} currency={currency} />
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ProductStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
