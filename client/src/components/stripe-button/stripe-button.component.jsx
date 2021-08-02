import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51J7EpoSDyvBe1wQeUAdoj6UCYYAeoiK36pK5IJfYhXEKbtj4UXJg6X1080mTZipxu0AcGCnGC006IMjq4ut7uuEp00b7ErUIRS'
    const onToken = token =>{
        console.log(token);
        axios({
            url:'/payment',
            method:"POST",
            data:{
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("payment Successful",response);
        }).catch(err => {
            console.log("Payment error:" , console.log(JSON.parse(err)));
            alert('There was an issue with your payment. Please make sure you use the Provided credit details')
        });
        
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name='New look sarees'
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;