import React from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as Logo } from '../../assests/crown.svg';

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCarthidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import {
    signOutStart } from '../../redux/user/user.action';


import './header.styles.scss';


const Header = ({ currentUser, hidden,signOutStart}) => (
    
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />

        </Link>
        <div className='options'>

            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            { 
                currentUser?
                <div className='option' onClick={signOutStart}>SIGN OUT</div>
                :
                <Link className="option" to='/signin'>SIGNIN</Link>
            }
            <CartIcon />
        </div>
        {
            hidden? null: (<CartDropdown />)
        }
        

    </div>)
    const mapStateToProps =  createStructuredSelector ({
        currentUser: selectCurrentUser,
        hidden: selectCarthidden
    });

    const mapDispatchToProps = dispatch => ({
        signOutStart: () => dispatch(signOutStart())

    });
   

    export default connect(mapStateToProps,mapDispatchToProps)(Header);