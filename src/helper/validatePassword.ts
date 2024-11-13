export const validatePassword =(password:string)=>{
    const regex = /^(?=.*[A-Z])(?=.*[@])(?=.*\d).+$/

    return regex.test(password);
}