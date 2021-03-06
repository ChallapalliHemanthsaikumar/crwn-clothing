import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

const CheckoutPage = ({cartItems,total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Products</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
            
      
        </div>  
        {   
            
                cartItems.map(cartItem =>
                    <CheckoutItem cartItem={cartItem} key={cartItem.id} />
                    )
            }
            
            <div className='total'>
                <span>TOTAL: ${total}</span>
            </div>
            <StripeCheckoutButton price={total} />
    </div>
);
const mapStateToprops = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartItemsTotal
    
});

export default connect(mapStateToprops)(CheckoutPage);