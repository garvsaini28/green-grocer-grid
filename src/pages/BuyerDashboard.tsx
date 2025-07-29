import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Star, Clock, ShoppingCart, Heart, Filter } from "lucide-react";

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const [savedProducts, setSavedProducts] = useState([1, 3, 5]);
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      price: 4.50,
      location: "California",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "Harvested today",
      organic: true,
      available: 150,
      unit: "lbs"
    },
    {
      id: 2,
      name: "Farm Fresh Carrots",
      farmer: "Sunny Acres",
      price: 3.00,
      location: "Oregon",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "2 days fresh",
      organic: false,
      available: 200,
      unit: "lbs"
    },
    {
      id: 3,
      name: "Organic Spinach",
      farmer: "Earth's Bounty",
      price: 5.00,
      location: "Vermont",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
      category: "leafy greens",
      freshness: "Harvested yesterday",
      organic: true,
      available: 80,
      unit: "bunches"
    },
    {
      id: 4,
      name: "Red Bell Peppers",
      farmer: "Harvest Moon Farm",
      price: 6.00,
      location: "Arizona",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop",
      category: "vegetables",
      freshness: "3 days fresh",
      organic: false,
      available: 120,
      unit: "lbs"
    },
    {
      id: 5,
      name: "Organic Apples",
      farmer: "Mountain View Orchard",
      price: 3.50,
      location: "Washington",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
      category: "fruits",
      freshness: "1 week fresh",
      organic: true,
      available: 300,
      unit: "lbs"
    }
  ];

  const categories = ["all", "vegetables", "fruits", "leafy greens", "herbs"];
  const locations = ["all", "California", "Oregon", "Vermont", "Arizona", "Washington"];
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating" },
    { value: "freshness", label: "Freshness" }
  ];

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesLocation = selectedLocation === "all" || product.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const toggleSaved = (productId: number) => {
    setSavedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart(prev => [...prev, productId]);
  };

  const cartTotal = cart.reduce((total, productId) => {
    const product = products.find(p => p.id === productId);
    return total + (product?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Buyer Dashboard
          </h1>
          <p className="text-xl text-primary-foreground/90 animate-slide-in-left">
            Browse and purchase fresh produce directly from local farmers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{filteredAndSortedProducts.length}</div>
              <div className="text-sm text-muted-foreground">Available Products</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{savedProducts.length}</div>
              <div className="text-sm text-muted-foreground">Saved Products</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{cart.length}</div>
              <div className="text-sm text-muted-foreground">Cart Items</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">${cartTotal.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">Cart Total</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Products</TabsTrigger>
            <TabsTrigger value="saved">Saved Products ({savedProducts.length})</TabsTrigger>
            <TabsTrigger value="cart">Cart ({cart.length})</TabsTrigger>
          </TabsList>

          {/* Browse Products Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="relative lg:col-span-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search products or farmers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
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

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
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

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <Card key={product.id} className="card-glow-hover group overflow-hidden border-0 shadow-card bg-card/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-smooth group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 ${
                          savedProducts.includes(product.id) ? 'text-red-500' : 'text-white'
                        }`}
                        onClick={() => toggleSaved(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${savedProducts.includes(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {product.freshness}
                      </Badge>
                      {product.organic && (
                        <Badge className="bg-primary text-primary-foreground">
                          Organic
                        </Badge>
                      )}
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-primary">${product.price}/{product.unit}</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.location}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.available} {product.unit} available
                    </p>

                    <Button 
                      className="w-full" 
                      variant="hero"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Products Tab */}
          <TabsContent value="saved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter(product => savedProducts.includes(product.id))
                .map((product, index) => (
                  <Card key={product.id} className="card-hover shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.farmer}</p>
                          <p className="text-lg font-bold text-primary">${product.price}/{product.unit}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="hero" onClick={() => addToCart(product.id)}>
                              Add to Cart
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => toggleSaved(product.id)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Cart Tab */}
          <TabsContent value="cart">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Shopping Cart</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">Browse products to add items to your cart</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((productId, index) => {
                      const product = products.find(p => p.id === productId);
                      if (!product) return null;
                      
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.farmer}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${product.price}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setCart(cart.filter((_, i) => i !== index))}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" variant="hero" size="lg">
                        Proceed to Checkout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;