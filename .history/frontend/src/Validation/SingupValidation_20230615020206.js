function registerValidation(values) {
    let errors = {};


    if (!values.name) {
        errors.name = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.name = 'Email is invalid';
      }
    
  
    if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
      }
    
      // Validasi password
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    
  
    return errors;
  }
  
  export default registerValidation;
  