
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { Currency } from "@/types/product";

export default function Index() {
  // Display only the first 3 products on homepage
  const featuredProducts = products.slice(0, 3);
  // Default currency for the homepage
  const [currency] = useState<Currency>('USD');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Premium Digital Products for Modern Creators
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Unlock your potential with our collection of high-quality digital products,
                templates, and tools designed for productivity and success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Browse Products
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured products section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <Link to="/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <ProductGrid products={featuredProducts} currency={currency} />
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ProductStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
