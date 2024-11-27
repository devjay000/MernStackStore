import React, { useContext } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Product = () => {
  const {products} = useContext(ShopContext);
  console.log("Product check");
  console.log(products);
  const {productId} = useParams();
  const product = products.find((e)=>e._id === productId);
  console.log("hello");
  console.log(productId);
  console.log(product);
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts products={products} />
    </div>
  )
}

export default Product
