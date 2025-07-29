import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Package, DollarSign, Users, Upload, Edit, Trash2, MapPin } from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

const FarmerDashboard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: "4.50",
      quantity: "150",
      unit: "lbs",
      location: "California",
      description: "Fresh, juicy organic tomatoes",
      status: "active",
      sales: 45
    },
    {
      id: 2,
      name: "Fresh Carrots",
      category: "vegetables",
      price: "3.00",
      quantity: "200",
      unit: "lbs",
      location: "California",
      description: "Sweet and crunchy carrots",
      status: "active",
      sales: 32
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "lbs",
    location: "",
    description: "",
    image: null as File | null
  });

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const categories = ["vegetables", "fruits", "leafy greens", "herbs", "grains"];
  const units = ["lbs", "kg", "bunch", "each", "box"];

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.quantity) {
      toast.error("Please fill in all required fields");
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      status: "active" as const,
      sales: 0
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      quantity: "",
      unit: "lbs",
      location: "",
      description: "",
      image: null
    });
    setIsAddingProduct(false);
    toast.success("Product added successfully!");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-primary"
    },
    {
      title: "Total Revenue",
      value: `$${products.reduce((sum, p) => sum + (p.sales * parseFloat(p.price)), 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-accent"
    },
    {
      title: "Active Buyers",
      value: "24",
      icon: Users,
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section 
        className="py-16 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Farmer Dashboard
          </h1>
          <p className="text-xl text-white/90 animate-slide-in-left">
            Manage your products and connect with buyers across the region.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-hero transition-smooth animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">My Products</TabsTrigger>
            <TabsTrigger value="add-product">Add New Product</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Products</h2>
              <Button 
                onClick={() => setIsAddingProduct(true)}
                variant="hero"
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Card key={product.id} className="card-hover shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.location}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm">Price:</span>
                        <span className="font-semibold text-primary">${product.price}/{product.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Quantity:</span>
                        <span className="font-semibold">{product.quantity} {product.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sales:</span>
                        <span className="font-semibold text-accent">{product.sales} {product.unit}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Product Tab */}
          <TabsContent value="add-product">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Add New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="e.g., Organic Tomatoes"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price per Unit *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="4.50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="quantity"
                          type="number"
                          value={newProduct.quantity}
                          onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                          placeholder="150"
                          className="flex-1"
                          required
                        />
                        <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newProduct.location}
                        onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                        placeholder="California"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Product Image</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.files?.[0] || null})}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image')?.click()}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </Button>
                        {newProduct.image && (
                          <span className="text-sm text-muted-foreground">{newProduct.image.name}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      placeholder="Describe your product..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" variant="hero" className="flex-1">
                      Add Product
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setNewProduct({
                          name: "",
                          category: "",
                          price: "",
                          quantity: "",
                          unit: "lbs",
                          location: "",
                          description: "",
                          image: null
                        });
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmerDashboard;