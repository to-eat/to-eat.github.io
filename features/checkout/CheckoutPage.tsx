
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Trash2, Plus, Minus, CreditCard, MapPin, ArrowLeft, ShieldCheck, ShoppingBag, Banknote, Bike, Store, Coins, Tag, Wallet, Sparkles, Crosshair, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useDataStore } from '@/store/useDataStore';
import { Navbar } from '@/components/organisms/Navbar';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';
import { Order } from '@/types';

type CheckoutStep = 'cart' | 'details';

interface DeliveryForm {
  address: string;
  city: string;
  zip: string;
  instructions: string;
  phone: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  // Client Store
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, user, deductWallet, accruePoints } = useStore();
  // Global DB Store
  const addOrder = useDataStore((state) => state.addOrder);
  
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  
  // New checkout state
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'wallet'>('cash');
  const [tipAmount, setTipAmount] = useState<number>(0);
  
  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string, discount: number } | null>(null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DeliveryForm>();
  
  const subtotal = getCartTotal();
  const deliveryFee = deliveryMethod === 'delivery' ? 25.00 : 0; // Updated fee for EGP context
  // Apply discount if promo is active
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discount) : 0;
  
  const tax = (subtotal - discountAmount) * 0.14; // 14% VAT in Egypt
  const finalTotal = (subtotal - discountAmount) + deliveryFee + tax + tipAmount;
  
  // Calculate points to be earned
  const potentialPoints = Math.floor(finalTotal * 10);

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    
    // Mock Validation Logic
    const code = promoCode.toUpperCase();
    if (code === 'WELCOME50') {
      setAppliedPromo({ code, discount: 0.5 }); // 50%
      toast.success('Promo applied: 50% OFF');
    } else if (code === 'LUNCH20') {
      setAppliedPromo({ code, discount: 0.2 }); // 20%
      toast.success('Promo applied: 20% OFF');
    } else if (code === 'FREESHIP') {
      if (deliveryMethod !== 'delivery') {
        toast.error('FREESHIP only applies to delivery');
        return;
      }
      setAppliedPromo({ code, discount: 0 }); // handled by conditional delivery fee logic in real app, simplified here
      toast.info('Free Shipping applied (Simulated)');
    } else {
      toast.error('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const handleLocateMe = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setTimeout(() => {
            setValue('address', '90 Road, Maadi');
            setValue('city', 'Cairo');
            setIsLocating(false);
            toast.success('Location found!');
          }, 1000);
        },
        (error) => {
          setIsLocating(false);
          toast.error('Could not access location. Please enter manually.');
        }
      );
    } else {
      setIsLocating(false);
      toast.error('Geolocation not supported by your browser.');
    }
  };

  const onSubmit = async (data: DeliveryForm) => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (paymentMethod === 'wallet') {
      if (user.walletBalance < finalTotal) {
        toast.error('Insufficient wallet balance. Please top up or select another method.');
        return;
      }
    }

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create Order Object for Global Store
    const orderId = `ord-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: orderId,
      userId: user.id,
      customerName: user.name,
      restaurantId: cart[0]?.restaurantId, // Assuming single restaurant order for MVP
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
      status: 'Placed',
      total: finalTotal,
      items: [...cart],
      deliveryMethod,
      paymentMethod,
      tip: tipAmount,
      deliveryAddress: deliveryMethod === 'delivery' ? `${data.address}, ${data.city}` : undefined
    };

    // Handle Payment Deduction
    if (paymentMethod === 'wallet') {
      const success = deductWallet(finalTotal, `Order #${orderId.split('-')[1]}`);
      if (!success) {
        setIsProcessing(false);
        return; // Halt if deduction fails (redundant check but safe)
      }
    }

    // Add to Global Store (simulating DB push)
    addOrder(newOrder);
    
    // Accrue Points locally
    accruePoints(potentialPoints);

    setIsProcessing(false);
    clearCart();
    toast.success(`Order placed! You earned ${potentialPoints} points.`);
    
    // Navigate to tracking
    navigate(`/tracking/${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Button onClick={() => navigate('/feed')}>Start Exploring</Button>
        </div>
      </div>
    );
  }

  const renderTipButton = (amount: number) => {
    const isSelected = tipAmount === amount;
    return (
      <button
        type="button"
        onClick={() => setTipAmount(amount)}
        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
          isSelected 
            ? 'bg-brand-500 text-white border-brand-500' 
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }`}
      >
        {amount} EGP
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button 
            onClick={() => step === 'details' ? setStep('cart') : navigate('/feed')}
            className="flex items-center text-sm text-gray-500 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            {step === 'details' ? 'Back to Cart' : 'Continue Shopping'}
          </button>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mt-4">
            {step === 'cart' ? 'Your Cart' : 'Checkout'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CART REVIEW STEP */}
            {step === 'cart' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 space-y-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex gap-4 py-4 border-b border-gray-100 last:border-0 last:pb-0 first:pt-0">
                      <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover bg-gray-100" />
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900">{item.title}</h3>
                            <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <p className="text-sm text-gray-500">{item.restaurantName}</p>
                          {/* Options & Notes */}
                          {(item.selectedOptions && item.selectedOptions.length > 0) && (
                            <p className="text-xs text-gray-500 mt-1">
                              + {item.selectedOptions.join(', ')}
                            </p>
                          )}
                          {item.instructions && (
                             <p className="text-xs text-brand-600 italic mt-1 bg-brand-50 inline-block px-1 rounded">
                               "{item.instructions}"
                             </p>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                            <button 
                              onClick={() => item.quantity > 1 ? updateQuantity(item.cartId, -1) : removeFromCart(item.cartId)}
                              className="p-1 hover:bg-white rounded-md transition-colors text-gray-600"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="p-1 hover:bg-white rounded-md transition-colors text-gray-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DELIVERY DETAILS STEP */}
            {step === 'details' && (
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Method Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      deliveryMethod === 'delivery' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-brand-200'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${deliveryMethod === 'delivery' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Bike size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">Delivery</span>
                      <span className="text-xs text-gray-500">To your door</span>
                    </div>
                  </div>
                  <div 
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      deliveryMethod === 'pickup' ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-brand-200'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${deliveryMethod === 'pickup' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Store size={20} />
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">Pickup</span>
                      <span className="text-xs text-gray-500">Skip the fee</span>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                {deliveryMethod === 'delivery' && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                          <MapPin size={20} />
                        </div>
                        <h2 className="font-bold text-lg text-gray-900">Delivery Address</h2>
                      </div>
                      <button 
                        type="button" 
                        onClick={handleLocateMe}
                        className="text-brand-600 text-sm font-medium flex items-center gap-1 hover:text-brand-700 disabled:opacity-50"
                        disabled={isLocating}
                      >
                        {isLocating ? <Loader2 size={14} className="animate-spin" /> : <Crosshair size={14} />}
                        Locate Me
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input 
                          {...register('address', { required: deliveryMethod === 'delivery' })}
                          type="text" 
                          placeholder="e.g. 15 Tahrir Square"
                          defaultValue={user?.addresses[0]?.fullAddress}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                        />
                        {errors.address && <span className="text-red-500 text-xs mt-1">Address is required</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City / District</label>
                          <input 
                            {...register('city', { required: deliveryMethod === 'delivery' })}
                            type="text" 
                            placeholder="Cairo"
                            defaultValue="Cairo"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            {...register('phone', { required: true })}
                            type="tel" 
                            placeholder="+20 1xx xxx xxxx"
                            defaultValue={user?.phone}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions</label>
                        <textarea 
                          {...register('instructions')}
                          placeholder="Gate code, leave at door, etc."
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tip Section (Only for delivery) */}
                {deliveryMethod === 'delivery' && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
                        <Coins size={20} />
                      </div>
                      <h2 className="font-bold text-lg text-gray-900">Tip your Rider</h2>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">100% of the tip goes to your rider.</p>
                    
                    <div className="flex gap-2 mb-3">
                      <button 
                         type="button" 
                         onClick={() => setTipAmount(0)}
                         className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${tipAmount === 0 ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                      >
                        Not now
                      </button>
                      {renderTipButton(10)}
                      {renderTipButton(20)}
                      {renderTipButton(50)}
                    </div>
                    <div className="relative">
                       <span className="absolute left-3 top-2 text-gray-500">EGP</span>
                       <input 
                         type="number" 
                         value={tipAmount > 0 ? tipAmount : ''}
                         onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
                         placeholder="Custom amount"
                         className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm"
                       />
                    </div>
                  </div>
                )}

                {/* Payment Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                      <Banknote size={20} />
                    </div>
                    <h2 className="font-bold text-lg text-gray-900">Payment Method</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => setPaymentMethod('wallet')}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center h-28 ${
                        paymentMethod === 'wallet' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white hover:border-brand-200'
                      }`}
                    >
                      <Wallet size={24} />
                      <span className="font-bold text-sm">Wallet Balance</span>
                      <span className="text-xs text-gray-500">${user?.walletBalance.toFixed(2)}</span>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('cash')}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center h-28 ${
                        paymentMethod === 'cash' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 bg-white hover:border-green-200'
                      }`}
                    >
                      <Banknote size={24} />
                      <span className="font-bold text-sm">Cash on Delivery</span>
                      <span className="text-xs text-gray-500">Pay when arrived</span>
                    </div>

                    <div 
                      className={`cursor-not-allowed opacity-60 p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center h-28 border-gray-100 bg-gray-50 text-gray-400`}
                    >
                      <CreditCard size={24} />
                      <span className="font-bold text-sm">Card (Disabled)</span>
                    </div>
                  </div>
                  
                  {paymentMethod === 'cash' && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg">
                      <ShieldCheck size={14} className="text-green-600" />
                      Cash payments are verified upon delivery/pickup.
                    </div>
                  )}
                  {paymentMethod === 'wallet' && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg">
                      <ShieldCheck size={14} className="text-brand-600" />
                      Payment will be deducted immediately from your wallet.
                    </div>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN - SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-lg text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                {appliedPromo && (
                  <div className="flex justify-between text-sm text-green-600 font-medium bg-green-50 p-2 rounded">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (14%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {tipAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span>Rider Tip</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                
                {/* Points Preview */}
                {step === 'details' && (
                  <div className="flex items-center justify-between text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg mt-2">
                    <span className="flex items-center gap-1"><Sparkles size={12} /> You will earn</span>
                    <span className="font-bold">{potentialPoints} Points</span>
                  </div>
                )}
              </div>

              {/* Promo Code Input */}
               <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                     <input 
                       type="text" 
                       value={promoCode}
                       onChange={(e) => setPromoCode(e.target.value)}
                       placeholder="Promo Code" 
                       className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:border-brand-500 outline-none uppercase"
                     />
                     <Tag size={14} className="absolute left-2.5 top-3 text-gray-400" />
                  </div>
                  <Button size="sm" variant="secondary" onClick={handleApplyPromo} disabled={!!appliedPromo}>
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                   <button 
                     onClick={() => { setAppliedPromo(null); setPromoCode(''); }}
                     className="text-xs text-red-500 mt-1 hover:underline ml-1"
                   >
                     Remove code
                   </button>
                )}
              </div>

              {step === 'cart' ? (
                <Button 
                  className="w-full py-3" 
                  size="lg"
                  onClick={() => setStep('details')}
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Button 
                  className="w-full py-3 flex items-center justify-center gap-2" 
                  size="lg"
                  form="checkout-form"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    `Place Order • $${finalTotal.toFixed(2)}`
                  )}
                </Button>
              )}
              
              {step === 'details' && (
                <p className="text-xs text-center text-gray-400 mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
