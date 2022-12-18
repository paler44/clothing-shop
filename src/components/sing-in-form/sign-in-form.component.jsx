import { useState, useContext} from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
    
} from "../../utills/firebase/firebase.utils";

import "./sign-in-form.styles.scss"


const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password,} = formFields;


  const {setCurrentUser} = useContext(UserContext)
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = async () =>{
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
}


const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const { user } = await signInAuthUserWithEmailAndPassword(
      email,
      password
    );
    setCurrentUser(user);
    resetFormFields();
    } catch (error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break
        case 'auth/user-not-found':
          alert('user not found')
          break
      default:
        console.log(error)
      }
  };
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    return(
      <div className="sign-up-container">
        <h2>Already havbe an account</h2>
          <span> Sign in with email and password</span>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type='email'
              onChange={handleChange}
              name="email"
              value={email}
              required/>
               
            <FormInput
              label ='Password'
              type='password'
              onChange={handleChange}
              name='password'
              value={password}
              required/>
            <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button
                  buttonType='google'
                  onClick={SignInWithGoogle}
                  type="button">Google Sign In
                </Button>
                </div>
               
            </form>
        </div>
    );
};

export default SignInForm