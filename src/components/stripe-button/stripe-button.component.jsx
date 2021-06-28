import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51J7EpoSDyvBe1wQeUAdoj6UCYYAeoiK36pK5IJfYhXEKbtj4UXJg6X1080mTZipxu0AcGCnGC006IMjq4ut7uuEp00b7ErUIRS'
    const onToken = token =>{
        console.log(token);
        alert('Payment Successful');
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