import faker from 'faker';

export function generatePassword(): string{
    
    let password = faker.internet.password(faker.datatype.number({min: 8, max: 20}), false, /[a-zA-Z0-9!@#$%*.?@]/) as string;

  // Check if password meets requirements
  let hasLowercase = false;
  let hasUppercase = false;
  let hasNumber = false;
  let hasSpecial = false;

  for (let i = 0; i < password.length; i++) {
    let char = password[i];
    if (/[a-z]/.test(char)) {
      hasLowercase = true;
    } else if (/[A-Z]/.test(char)) {
      hasUppercase = true;
    } else if (/[0-9]/.test(char)) {
      hasNumber = true;
    } else if (/[!@#$%*.?@]/.test(char)) {
      hasSpecial = true;
    }

    if (hasLowercase && hasUppercase && hasNumber && hasSpecial) {
      break;
    }
  }

  if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecial) {
    return generatePassword();
  }

  return password;
}