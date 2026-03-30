"use client";

import { useAuth } from "@/components/AuthProvider";
import { Loader2, Check, CreditCard, Lock, ArrowRight } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";

// Initialize Stripe outside of component to avoid recreating object on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ selectedPackage, clientSecret, onSuccess, onProcessing }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  if (!selectedPackage) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    onProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL is required usually, but we are doing redirect: 'if_required' or handling it inline if possible
        // safely. For simple integration without redirect, we can check status.
        return_url: window.location.origin + "/dashboard/purchase-coin",
      },
      redirect: "if_required", 
    });

    if (error) {
      setMessage(error.message);
      setIsProcessing(false);
      onProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Payment successful, now save to DB
        try {
            const res = await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_email: user.email,
                    amount: selectedPackage.price,
                    coins: selectedPackage.coins,
                    transactionId: paymentIntent.id
                })
            });

            if (res.ok) {
                onSuccess();
            } else {
                 setMessage("Payment succeeded but failed to save record. Please contact support.");
            }
        } catch (err) {
            setMessage("System error after payment.");
        } finally {
            setIsProcessing(false);
            onProcessing(false); 
        }
    } else {
        setIsProcessing(false);
        onProcessing(false);
        setMessage("Payment status: " + paymentIntent.status);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement />
        {message && <div className="text-red-500 text-sm font-bold">{message}</div>}
        <Button type="submit" className="w-full font-bold bg-primary text-black hover:bg-white" disabled={isProcessing || !stripe || !elements}>
          {isProcessing ? <Loader2 className="animate-spin mr-2" /> : `Pay $${selectedPackage?.price || 0} with Stripe`}
        </Button>
      </form>

      <p className="text-xs text-center text-zinc-500 flex items-center justify-center gap-1 mt-4">
          <Lock size={12} />
          Secured by Stripe
      </p>
    </div>
  );
}

function PurchaseCoinContent() {
  const { user, role, loading, refetchUser } = useAuth(); // Get refetchUser
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState('select-region'); 
  const router = useRouter();
  const queryClient = useQueryClient();

  const packages = [
    { coins: 10, price: 1, label: "Starter" },
    { coins: 150, price: 5, label: "Popular" },
    { coins: 500, price: 10, label: "Pro" },
    { coins: 1000, price: 20, label: "Enterprise" },
  ];

  const handlePackageClick = (pkg) => {
     setSelectedPackage(pkg);
     setIsSuccess(false);
     setClientSecret(""); 
     setPaymentStep('select-region');
  };

  const initStripe = () => {
     if (!selectedPackage) return;
     setPaymentStep('stripe');
     fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: selectedPackage?.price }),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.clientSecret) {
             setClientSecret(data.clientSecret);
          } else {
             console.error("Failed to get client secret", data);
          }
      })
      .catch(err => console.error(err));
  };

  const handleSSLCommerz = async () => {
    if (!selectedPackage) return;
    setIsProcessing(true);
    try {
      const res = await fetch("/api/ssl/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          amount: selectedPackage?.price * 110, // Assuming 1 USD = 110 BDT approx
          coins: selectedPackage?.coins
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Could not initiate SSLCommerz payment.");
        setIsProcessing(false);
      }
    } catch (err) {
      alert("System error.");
      setIsProcessing(false);
    }
  };

  const handleSuccess = () => {
     // INSTANT UPDATE LOGIC
     refetchUser(); // Update coin balance in navbar
     queryClient.invalidateQueries({ queryKey: ['notifications'] }); // Update notifications list

     setIsSuccess(true);
     setTimeout(() => {
        setSelectedPackage(null);
        setClientSecret("");
        setIsSuccess(false);
        // router.refresh(); // No longer needed as we use React Query state
     }, 3000);
  };

  const searchParams = useSearchParams();
  const statusParam = searchParams.get('status');

  useEffect(() => {
    if (statusParam === 'success') {
       refetchUser();
       queryClient.invalidateQueries({ queryKey: ['notifications'] });
       setIsSuccess(true);
       setSelectedPackage({ coins: 'Your', price: 'payment' }); // dummy to keep modal open
       setTimeout(() => {
           setSelectedPackage(null);
           setIsSuccess(false);
           router.replace('/dashboard/purchase-coin');
       }, 3000);
    } else if (statusParam === 'fail' || statusParam === 'cancel') {
       alert("Payment was " + statusParam);
       router.replace('/dashboard/purchase-coin');
    }
  }, [statusParam, refetchUser, queryClient, router]);

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;

  if (role !== "buyer") {
     return <div className="text-red-500 p-8">Access Denied: Only Buyers can access this page.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-inter tracking-tight">Purchase Coins</h1>
        <p className="text-zinc-400 mt-1">Invest in coins to post more tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, i) => (
            <Card key={i} className={`relative hover:border-primary transition-colors cursor-pointer group flex flex-col ${pkg.label === 'Popular' ? 'border-primary/50 bg-primary/5' : 'border-zinc-800 bg-zinc-900'}`}
             onClick={() => handlePackageClick(pkg)}
            >
                {pkg.label === 'Popular' && (
                    <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-2 py-1 rounded-bl-lg z-10">
                        Most Popular
                    </div>
                )}
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-4xl font-black font-inter mb-2 text-primary">{pkg.coins}</CardTitle>
                    <CardDescription className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Coins</CardDescription>
                </CardHeader>
                <CardContent className="text-center flex-1">
                    <div className="text-2xl font-bold text-white mb-4">
                        ${pkg.price}
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400 text-left px-4">
                        <li className="flex items-center gap-2">
                            <Check size={14} className="text-green-500" />
                            <span>Instant delivery</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={14} className="text-green-500" />
                            <span>Valid forever</span>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className={`w-full font-bold ${pkg.label === 'Popular' ? 'bg-primary text-black hover:bg-white' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                        Buy Now
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>

       {/* Payment Modal */}
      <Dialog open={!!selectedPackage} onOpenChange={(open) => !isProcessing && !isSuccess && setSelectedPackage(open ? selectedPackage : null)}>
         <DialogContent className="sm:max-w-md bg-zinc-900 border border-zinc-800">
             {!isSuccess ? (
                 <>
                    <DialogHeader>
                        <DialogTitle>Secure Payment</DialogTitle>
                        <DialogDescription>
                             Purchase <span className="font-bold text-white">{selectedPackage?.coins} Coins</span> for <span className="font-bold text-green-500">${selectedPackage?.price}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {paymentStep === 'select-region' && (
                        <div className="space-y-4 py-4">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest text-center mb-6">Select your region</h3>
                            
                            <div className="grid grid-cols-1 gap-4">
                                <button 
                                  onClick={handleSSLCommerz}
                                  disabled={isProcessing}
                                  className="w-full flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-950 rounded-xl hover:border-primary/50 hover:bg-zinc-800 transition-all text-left group disabled:opacity-50"
                                >
                                    <div className="text-3xl">🇧🇩</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white group-hover:text-primary transition-colors">Bangladesh</div>
                                        <div className="text-xs text-zinc-500">Pay in BDT with bKash, Nagad, Rocket or Cards</div>
                                    </div>
                                    {isProcessing && <Loader2 className="animate-spin text-zinc-500" size={20} />}
                                </button>

                                <button 
                                  onClick={initStripe}
                                  disabled={isProcessing}
                                  className="w-full flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-950 rounded-xl hover:border-blue-500/50 hover:bg-zinc-800 transition-all text-left group disabled:opacity-50"
                                >
                                    <div className="text-3xl">🌍</div>
                                    <div className="flex-1">
                                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">International</div>
                                        <div className="text-xs text-zinc-500">Pay in USD with secure Stripe checkout</div>
                                    </div>
                                    <ArrowRight className="text-zinc-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={20} />
                                </button>
                            </div>
                        </div>
                    )}

                    {paymentStep === 'stripe' && (
                        clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret, theme: 'night', appearance: { theme: 'night', labels: 'floating' } }}>
                                <CheckoutForm 
                                    selectedPackage={selectedPackage} 
                                    clientSecret={clientSecret} 
                                    onSuccess={handleSuccess}
                                    onProcessing={setIsProcessing}
                                />
                            </Elements>
                        ) : (
                            <div className="flex justify-center py-10">
                                <Loader2 className="animate-spin text-primary" />
                            </div>
                        )
                    )}
                 </>
             ) : (
                 <div className="py-10 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-300">
                     <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-black mb-2">
                         <Check size={32} strokeWidth={4} />
                     </div>
                     <DialogHeader className="flex flex-col items-center text-center">
                         <DialogTitle className="text-2xl font-bold text-white">Payment Successful!</DialogTitle>
                         <DialogDescription className="text-zinc-400">
                           {selectedPackage?.coins} coins have been added to your account.
                         </DialogDescription>
                     </DialogHeader>
                 </div>
             )}
         </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PurchaseCoinPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>}>
      <PurchaseCoinContent />
    </Suspense>
  );
}
