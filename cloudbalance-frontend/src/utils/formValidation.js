 export function validateEmail(email) {
    if (email.trim() === "") {
     
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      
      return false;
    }
    return true;
  }