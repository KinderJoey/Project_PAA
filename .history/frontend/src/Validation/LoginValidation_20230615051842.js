function validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if(values.email ===""){
        error.email = "name shoudl not be empty"
    }
    else{
        error.email =""
    }
  
    if(values.password ===""){
        error.password = "name shoudl not be empty"
    }
    else{
        error.password =""
    }

  
    return error;
  }
  
  export default validation;
  