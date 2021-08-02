import { createSelector } from "reselect";


const selectCart = state => state.cart;

export const selectCarthidden = createSelector(
    [selectCart],
    cart => cart.hidden,
);

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems 
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity,cartItem) =>
        
            accumalatedQuantity + cartItem.quantity,
            0));


export const selectCartItemsTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedPrice,cartItem) => 

        accumalatedPrice + cartItem.price*cartItem.quantity,0)
);            