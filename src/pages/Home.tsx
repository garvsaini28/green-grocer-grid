import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, ShoppingCart, TrendingUp, CheckCircle, Leaf, Heart, Shield } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";
import marketImage from "@/assets/market-produce.jpg";

const Home = () => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Fresh from Farm to Your Table",
    "Connecting Farmers with Buyers",
    "Sustainable Local Agriculture"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Direct Connection",
      description: "Connect farmers directly with buyers, eliminating middlemen and increasing profits."
    },
    {
      icon: Leaf,
      title: "Fresh & Sustainable",
      description: "Promote sustainable farming practices and deliver the freshest produce to consumers."
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "Every product is verified for quality and freshness before reaching your table."
    },
    {
      icon: TrendingUp,
      title: "Fair Pricing",
      description: "Transparent pricing that benefits both farmers and buyers in the supply chain."
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Farmers", icon: Users },
    { number: "15,000+", label: "Happy Buyers", icon: ShoppingCart },
    { number: "98%", label: "Fresh Guarantee", icon: CheckCircle },
    { number: "50+", label: "Cities Served", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-accent rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 bg-primary-glow rounded-full opacity-50"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-8 h-8 bg-accent/40 rounded-full"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-accent to-primary-glow bg-clip-text text-transparent">
                {heroTexts[currentText]}
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-in-left">
              Building a sustainable bridge between local farmers and quality-conscious buyers.
              Experience fresh, locally-sourced produce delivered directly from the farm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-right">
              <Link to="/products">
                <Button variant="farm" size="xl" className="group">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
              <Link to="/farmer-dashboard">
                <Button variant="outline" size="xl" className="bg-white/10 border-white text-white hover:bg-white hover:text-foreground">
                  Join as Farmer
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose <span className="text-primary">Farm2Market</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing the agricultural supply chain with technology that benefits everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover group animate-fade-in border-0 shadow-card bg-card/50 backdrop-blur-sm" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:scale-110 transition-smooth group-hover:glow-primary">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Growing Together</h2>
            <p className="text-xl text-primary-foreground/80">
              Our platform continues to connect more farmers and buyers every day.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-bounce-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${marketImage})` }}
        ></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground animate-fade-in">
            Ready to Join the <span className="text-primary">Farm2Market</span> Revolution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 animate-slide-in-left">
            Whether you're a farmer looking to sell directly or a buyer seeking fresh, local produce,
            we have the perfect solution for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-right">
            <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-card hover:shadow-hero transition-smooth group">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-smooth" />
              <h3 className="text-xl font-semibold mb-2">For Farmers</h3>
              <p className="text-muted-foreground mb-4">Sell your produce directly to buyers and increase your profits.</p>
              <Link to="/farmer-dashboard">
                <Button variant="hero" className="w-full">
                  Start Selling
                </Button>
              </Link>
            </div>
            
            <div className="bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-card hover:shadow-hero transition-smooth group">
              <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-smooth" />
              <h3 className="text-xl font-semibold mb-2">For Buyers</h3>
              <p className="text-muted-foreground mb-4">Access fresh, local produce directly from trusted farmers.</p>
              <Link to="/buyer-dashboard">
                <Button variant="hero" className="w-full">
                  Start Buying
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;