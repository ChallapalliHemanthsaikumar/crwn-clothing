import React from 'react';

import  FromInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument} from '../../firebase/firebase.utils'

import './sign-up.styles.scss';

class SignUp extends React.Component{
    constructor(){
        super();
        
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmpassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, password,email, confirmpassword} = this.state;

        if(password !== confirmpassword){
            alert("Password don't match");
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmpassword: ''

            })

        }catch (e){
            console.error(e);
        }

    }
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({[name]: value});

    }

    render(){
        const { displayName, email, password, confirmpassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FromInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required 
                    />
                    <FromInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required 
                    />
                    <FromInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='password'
                        required 
                    />
                    <FromInput
                        type='password'
                        name='confirmpassword'
                        value={confirmpassword}
                        onChange={this.handleChange}
                        label='confirm Password'
                        required 
                    />

                    <CustomButton type='submit'> SIGN UP</CustomButton>
                            
                              

                    

                </form>
            </div>
                )}
}

export default SignUp;