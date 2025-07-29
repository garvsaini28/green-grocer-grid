import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    userType: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        userType: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Farm Lane", "Agricultural Valley, AV 12345", "United States"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-FARM", "+1 (555) 123-3276", "Mon-Fri: 8AM-6PM"],
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@farm2market.com", "support@farm2market.com", "partnerships@farm2market.com"],
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed"],
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl text-primary-foreground/90 animate-slide-in-left">
            Get in touch with us. We're here to help farmers and buyers connect.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about Farm2Market? Want to partner with us? We'd love to hear from you. 
                Our team is ready to help you succeed in the local agricultural marketplace.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="shadow-card hover:shadow-hero transition-smooth animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full bg-primary/10 ${info.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your full name"
                        required
                        className="transition-smooth focus:glow-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                        className="transition-smooth focus:glow-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userType">I am a...</Label>
                      <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value})}>
                        <SelectTrigger className="transition-smooth focus:glow-primary">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="farmer">Farmer</SelectItem>
                          <SelectItem value="buyer">Buyer/Restaurant Owner</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="consumer">Consumer</SelectItem>
                          <SelectItem value="partner">Potential Partner</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="What's this about?"
                        className="transition-smooth focus:glow-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                      className="transition-smooth focus:glow-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-card overflow-hidden animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Find Us Here</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    Google Maps integration would be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    123 Farm Lane, Agricultural Valley, AV 12345
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="shadow-card animate-slide-in-left">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How do I sign up as a farmer?</h3>
                  <p className="text-muted-foreground">
                    Simply click on "Join as Farmer" and create your account. You can start listing your produce immediately after verification.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">What are the fees for using Farm2Market?</h3>
                  <p className="text-muted-foreground">
                    We charge a small commission only when you make a sale. There are no upfront costs or monthly fees.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card animate-slide-in-right">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How do I ensure product quality?</h3>
                  <p className="text-muted-foreground">
                    All farmers go through our verification process, and we have a rating system where buyers can review products and farmers.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers. Payments are processed securely through our platform.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;