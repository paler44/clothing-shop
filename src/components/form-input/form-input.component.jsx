import { useState } from 'react';
import './form-input.styles.scss'

const FormInput = ({errorMessage, label, ...otherProps}) =>{
  const[focused, setFocused] = useState(false)
  
  const handleFocus = (e) =>{
    setFocused(true)
  }
  return(
    <div className="group">
      <input 
        className="form-input"
        {...otherProps} 
        onBlur ={handleFocus} 
        focused ={focused.toString()}
        onFocus={() =>
          otherProps.name==="confirmPassword" && setFocused(true)}
        />
      {label&& (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''}
            form-input-label`}
        >
          {label}
        </label>
        )}
        <span className='validation-error-message'>{errorMessage}</span>
      </div>
    );
};

export default FormInput