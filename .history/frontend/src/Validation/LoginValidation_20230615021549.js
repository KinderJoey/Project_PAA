function validation(values) {
    alert("")
    let errors = {};
    const email_patern = /^[^\s@]+\.{^\s@}+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[a-z])[a-zA-Z0-9]{8,}$/

export default validation