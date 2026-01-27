export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email || '').trim());
}

export function isValidPassword(password) {
  return PASSWORD_REGEX.test(String(password || ''));
}
