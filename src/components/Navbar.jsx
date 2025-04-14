import React, { useCallback, useEffect, useState } from 'react'
import Products from './Products';
import Cart from './Cart';

const Navbar = ({products}) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [cache, setCache] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartList, setCartList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const fetchResult = useCallback(async()=>{
        if (cache[input]){
            setResults(cache[input]);
            return ;
        }
        const data = await fetch('https://dummyjson.com/products/search?q='+input);
        const json = await data.json();
        setResults(json.products);
        setCache((prev)=>({...prev, [input]:json.products}));
    },[input,cache])
    
    useEffect(()=>{
        const timer = setTimeout(fetchResult,300);
        return ()=>{
            clearTimeout(timer);
        }
    },[input, fetchResult]);
    const handleSearch=(r)=>{
        setSelectedProduct(r);
        setShowResult(false);
        setInput('');
        setShowCart(false);
    };
    const handleHome = () =>{
        setSelectedProduct(null);
        setShowCart(false);
    };
    const handleBlur = () => {
        setTimeout(() => setShowResult(false), 200);
    };
    const addToCart = (product) => {
        setCartList(prevCartList => {
            const existingProductIndex = prevCartList.findIndex(item => item.id === product.id);
        
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCartList];
                
                if (!updatedCart[existingProductIndex].quantity) {
                    updatedCart[existingProductIndex] = {
                        ...updatedCart[existingProductIndex],
                        quantity: 1
                    };
                }
            
            updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + 1
            };
            
            return updatedCart;
            } else {
                return [...prevCartList, {...product, quantity: 1}];
            }
        });
        setAlert({ 
            show: true, 
            message: `${product.title} added to cart!`, 
            type: 'success' 
        });
          
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' });
        }, 1000);
    };

    const removeCartItem = (product)=> {
        const updatedCart = cartList.filter(item=> item.id!==product.id);
        setCartList(updatedCart);
        setAlert({ 
            show: true, 
            message: `${product.title} removed from cart!`, 
            type: 'error' 
        });
          
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' });
        }, 1000);
    };

    const toggleCart = () => {
        setShowCart(prev => !prev); 
        setSelectedProduct(null); 
    };

  return (
    <>
    
        <nav className='fixed w-full top-0 bg-gradient-to-r from-amber-50 to-amber-100 shadow-md z-50 mb-5'>
            <div className='flex justify-between items-center px-4 py-3 max-w-7xl mx-auto'>
                <h1 
                className='font-serif text-lg font-semibold hover:text-amber-600 cursor-pointer transition-colors 
                duration-200 flex items-center gap-2'
                onClick={() => handleHome()}
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 
                    1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
                </h1>

                <div className="relative flex-1 max-w-2xl mx-6">
                    <div className="relative">
                        <input
                        type="text"
                        placeholder='Search for products'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setShowResult(true)}
                        onBlur={handleBlur}
                        className='w-full border border-gray-300 rounded-full py-2 px-4 pl-10 text-gray-700 focus:outline-none 
                        focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200'
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 
                            0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {showResult && (
                    <div className='absolute mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white 
                    shadow-lg z-50'>
                        {results.length > 0 ? (
                            results.map((r) => (
                            <div
                                key={r.id}
                                className='px-4 py-2 hover:bg-amber-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                                onMouseDown={() => handleSearch(r)}
                            >
                                <div className="text-sm text-gray-800">{r.title}</div>
                            </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 italic">No results found</div>
                        )}
                    </div>
                )}
                </div>

                <button 
                className='flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-full 
                transition-colors duration-200'
                onClick={toggleCart}
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 
                    13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {cartList.length > 0 && (
                    <span className="inline-flex items-center justify-center w-5 h-5 bg-white text-amber-600 text-xs font-bold 
                    rounded-full">
                    {cartList.length}
                    </span>
                )}
                </button>
            </div>
        </nav>
        <div>
            {alert.show && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 inline-block">
                    <div className={`px-4 py-2 rounded-full text-white text-sm shadow-lg ${
                        alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                    {alert.message}
                    </div>
                </div>
            )}
            {showCart ? (
                    <Cart cartList={cartList} removeCartItem={removeCartItem} handleHome={handleHome}/>
                ) : (
                    selectedProduct ? 
                    <Products products={[selectedProduct]} addToCart={addToCart} /> : 
                    <Products products={products} addToCart={addToCart} />
            )}
        </div>
    </>
  )
}

export default Navbar