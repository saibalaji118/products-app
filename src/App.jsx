import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setProducts(json.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar products={products}/>
    </>
  )
}

export default App
