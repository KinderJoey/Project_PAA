function validation(values) {
    alert("")
    let errors = {};
    const email_patern = /^[^\s@]+\.{^\s@}+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[a-z])[a-zA-Z0-9]{8,}$/

    if(values.email === ""){
        eror.email "email should not be empty"
    }
    else if(!email_patern.test(values.email)){
        error.email = "email disn't match"
    }
    else{
        eror.email =""
    }

    
    if(values.password === ""){
        eror.password "password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "password disn't match"
    }
    else{
        eror.password =""
    }



export default validation