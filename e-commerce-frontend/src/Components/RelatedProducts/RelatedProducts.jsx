import React from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import data_product from '../Assets/data'

const RelatedProducts = (props) => {
  const {products} = props
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {products.map((item)=>{
            return <Item id={item._id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
