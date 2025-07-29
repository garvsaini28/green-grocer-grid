import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Clock, Leaf } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      price: "$4.50/lb",
      location: "California",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "Harvested today",
      organic: true,
      description: "Fresh, juicy organic tomatoes perfect for salads and cooking."
    },
    {
      id: 2,
      name: "Farm Fresh Carrots",
      farmer: "Sunny Acres",
      price: "$3.00/lb",
      location: "Oregon",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "2 days fresh",
      organic: false,
      description: "Sweet and crunchy carrots, perfect for roasting or snacking."
    },
    {
      id: 3,
      name: "Organic Spinach",
      farmer: "Earth's Bounty",
      price: "$5.00/bunch",
      location: "Vermont",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      category: "leafy greens",
      freshness: "Harvested yesterday",
      organic: true,
      description: "Fresh organic spinach leaves, packed with nutrients."
    },
    {
      id: 4,
      name: "Red Bell Peppers",
      farmer: "Harvest Moon Farm",
      price: "$6.00/lb",
      location: "Arizona",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "3 days fresh",
      organic: false,
      description: "Vibrant red bell peppers with a sweet, crisp flavor."
    },
    {
      id: 5,
      name: "Organic Apples",
      farmer: "Mountain View Orchard",
      price: "$3.50/lb",
      location: "Washington",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      category: "fruits",
      freshness: "1 week fresh",
      organic: true,
      description: "Crisp and sweet organic apples, perfect for eating or baking."
    },
    {
      id: 6,
      name: "Fresh Lettuce",
      farmer: "Garden Fresh Co.",
      price: "$2.50/head",
      location: "Florida",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
      category: "leafy greens",
      freshness: "Harvested today",
      organic: false,
      description: "Crisp iceberg lettuce perfect for salads and sandwiches."
    }
  ];

  const categories = ["all", "vegetables", "fruits", "leafy greens", "herbs"];
  const locations = ["all", "California", "Oregon", "Vermont", "Arizona", "Washington", "Florida"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || product.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Fresh Local Produce
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 animate-slide-in-left">
            Discover the freshest produce directly from local farmers in your area.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Card key={product.id} className="card-glow-hover group overflow-hidden border-0 shadow-card bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {product.organic && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {product.freshness}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      {product.rating}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.farmer}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                  </div>

                  <Button className="w-full" variant="hero">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;