import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from "../../utills/firebase/firebase.utils";

import "./sign-up-form.styles.scss"

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    return(
        <div className="sign-up-container">
            <h2> Don't have an account</h2>
            <span> Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                  label="Display Name"
                  type='text'
                  onChange={handleChange}
                  name="displayName"
                  value ={displayName}
                  errorMessage = "Display Name should be 3-16 characters and shouldn't any special character"
                  pattern = "^[A-Za-z0-9]{3,16}$"
                  required/>

                <FormInput
                  label="Email"
                  type='email'
                  onChange={handleChange}
                  name="email"
                  value={email}
                  errorMessage = "It should be a valid email adress"
                  required/>
                
                <FormInput
                  label ='Password'
                  type='password'
                  onChange={handleChange}
                  name='password'
                  value={password}
                  errorMessage = "Password should be 9-10 characters and should icludes at least 1 letter, 1 number and 1 special character"
                  pattern = "^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,10}$"
                  required/>
                
                
                <FormInput
                  label='Confirm Password' 
                  type='password'
                  onChange={handleChange}
                  name='confirmPassword'
                  value={confirmPassword}
                  errorMessage = "Password don't match"
                  pattern = {formFields.password}
                  required/>
                <Button 
                disabled ={!email || !password || !displayName || !confirmPassword} 
                type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm