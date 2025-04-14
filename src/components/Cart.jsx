import React from 'react'
import ProductCard from './ProductCard'

const Cart = ({cartList, removeCartItem, handleHome}) => {
  return (
    <div className="flex flex-wrap mt-20">
        {cartList.length===0 ?(
            <div className='flex flex-row items-center justify-center pt-16 pb-10 px-4'>
                <div className="flex flex-col items-center justify-center max-w-md w-full">
                    <div className="text-amber-400 mb-4">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 
                        13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0
                         2 2 0 014 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 text-center max-w-sm mb-6">Looks like you haven't added any products to your cart yet.</p>
                    <button 
                        onClick={()=>handleHome()} 
                        className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-colors 
                        duration-200 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Continue Shopping
                    </button>
                </div>
            </div>
            
        ):
        ( cartList.map((cart) => (
          <ProductCard key={cart.id} product={cart} isCart={true} removeCartItem={removeCartItem}/>
        )))}
    </div>
  )
}

export default Cart