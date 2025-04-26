
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: "product-1",
    title: "Premium UI Kit",
    description: "A comprehensive UI kit for modern web applications. Includes over 100 components, 50 templates, and unlimited customization options.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    type: "digital",
    downloadUrl: "/downloads/premium-ui-kit.zip"
  },
  {
    id: "product-2",
    title: "Business Analytics Dashboard",
    description: "Ready-to-use analytics dashboard with 20+ charts, data visualization components, and customizable reporting tools.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    type: "digital",
    downloadUrl: "/downloads/business-analytics-dashboard.zip"
  },
  {
    id: "product-3",
    title: "E-Commerce Starter Kit",
    description: "Complete e-commerce solution with product listings, cart functionality, checkout process, and admin panel.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    type: "digital",
    downloadUrl: "/downloads/ecommerce-starter-kit.zip"
  },
  {
    id: "product-4",
    title: "SEO Toolkit",
    description: "Complete SEO analysis and optimization toolkit for improving your website's search engine rankings.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    type: "digital",
    downloadUrl: "/downloads/seo-toolkit.zip"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
