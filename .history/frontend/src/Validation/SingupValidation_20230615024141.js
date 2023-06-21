function registerValidation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    

    if(values.name ===""){
        errors.name = "name shoudl not be empty"
    }
    else{
        errors.name =""
    }

    if (values.email === "") {
      errors.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email is invalid";
    }
  
    if (values.password === "") {
      errors.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password is invalid";
    }


    return errors;
  }
  
  export default registerValidation;
  