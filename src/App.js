import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';

import { selectCurrentUser} from './redux/user/user.selectors'
import CheckoutPage  from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.action';




 

class App extends React.Component {

 
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();

  }

  // componentDidMount() {
   
  //   const { setCurrentUser} = this.props;


  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //   if(userAuth){ 
  //     const userRef = await createUserProfileDocument(userAuth);
  //     userRef.onSnapshot(snapShot => {
  //       setCurrentUser({ 
          
  //           id: snapShot.id,
  //           ...snapShot.data()
          
  //       });
       
  //     });

  //     setCurrentUser(userAuth);
    
  //   }      
      


  //   });

  // }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render() {
    return (
      <div>
        <Header  />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={()=> this.props.currentUser ?(<Redirect to='/' />): (<SignInAndSignUpPage/>)} />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      
        
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),


});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});




export default connect(mapStateToProps,mapDispatchToProps)(App);
