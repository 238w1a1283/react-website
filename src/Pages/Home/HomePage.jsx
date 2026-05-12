import { Header } from '../../components/Header.jsx';
import './HomePage.css'
import ProductsGrid from './ProductsGrid';
import { useSearchParams } from 'react-router-dom';

import axios from 'axios'
import {useEffect,useState} from 'react'
export function HomePage({cart,loadCart}){
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

   const search = searchParams.get('search');
 
 useEffect(() => {
    const getHomeData= async ()=>{
        const response = await axios.get(
            `/api/products?search=${search || ''}`
            );
         setProducts(response.data);
    };
    getHomeData();
}, [search]);
    return(
    <>
        <Header cart={cart}/>
    <div className="home-page">
     <ProductsGrid products={products} loadCart={loadCart}/>
    </div>

</>
    );
}