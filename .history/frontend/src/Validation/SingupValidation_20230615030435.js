function registerValidation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    

    if(values.name ===""){
        error.name = "name shoudl not be empty"
    }
    else{
        error.name =""
    }

    if (values.email === "") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Email is invalid";
    }
  
    if (values.password === "") {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password = "Password is invalid";
    }


    return error;
  }
  
  export default registerValidation;
  