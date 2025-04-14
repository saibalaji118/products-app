import React from 'react'

const ProductCard = ({product, addToCart, isCart, removeCartItem}) => {
    const handleAddItem = (cart)=>{
        addToCart(cart);
    };
    const handleRemoveItem = (cart)=>{
        removeCartItem(cart);
    };

  return (
        <div className="product-card border-2 rounded-xl p-4 flex flex-col items-center gap-3
                    border-gray-200 hover:border-blue-500 hover:shadow-lg
                    hover:-translate-y-1 transition-all duration-300 bg-white hover:bg-blue-50 ">
            <div className="overflow-hidden rounded-lg w-full h-48 flex items-center justify-center bg-gray-100">
                <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="object-contain w-full h-full" 
                />
            </div>
            <h3 className="text-center font-medium text-gray-800 line-clamp-2 h-12 flex items-center">
                {product.title}
            </h3>
            <div className="w-full mt-auto ">
                {isCart ? (
                <button 
                    onClick={() => handleRemoveItem(product)}
                    className="w-full py-2 rounded-lg bg-red-500 text-white font-medium cursor-pointer
                            hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <span>Remove from Cart</span>
                </button>
                ) : (
                <button 
                    onClick={() => handleAddItem(product)}
                    className="w-full py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer
                            hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                </button>
                )}
            </div>
        </div>
  )
}

export default ProductCard