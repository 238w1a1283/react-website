import { Header } from "../../components/Header";
import './HomePage.css'
import ProductsGrid from './ProductsGrid';

import axios from 'axios'
import {useEffect,useState} from 'react'
export function HomePage({cart,loadCart}){
  const [products, setProducts] = useState([]);
 
 useEffect(() => {
    const getHomeData= async ()=>{
         const response = await axios.get('/api/products');
         setProducts(response.data);
    };
    getHomeData();
}, []);
    return(
    <>
        <Header cart={cart}/>
    <div className="home-page">
     <ProductsGrid products={products} loadCart={loadCart}/>
    </div>

</>
    );
}