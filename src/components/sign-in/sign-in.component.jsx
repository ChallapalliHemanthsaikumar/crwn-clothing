import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart,emailSignInStart} from '../../redux/user/user.action';
import  { connect } from 'react-redux';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit= async event =>{
        event.preventDefault();
        const { email, password} = this.state;
        const { emailSignInStart} = this.props;
        emailSignInStart(email, password);
        
       
    }

    handleChange = event => {
        const { value , name } = event.target;
        this.setState({ [name]: value})
    }

    render(){
        const { googlesSignInStart} = this.props;
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                     name='email' 
                     type="email"
                     handleChange={this.handleChange} 
                     value={this.state.email} 
                     label='email'
                     required
                    />
                    {
                        console.log(this.props)
                    }
                    <FormInput
                     name='password' 
                     type="password"
                    
                     value={this.state.password}
                     handleChange={this.handleChange}
                     label='password' 
                     required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in</CustomButton>
                        <CustomButton type='button' onClick={googlesSignInStart} isGoogleSignIn type='button'> Sign in with google</CustomButton>

                    </div>
                   
                </form>

            </div>)}
}

const mapDispatchToProps = dispatch => ({
    googlesSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart:(email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);