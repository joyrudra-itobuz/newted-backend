interface IREG_EX {
  usernameFormat: RegExp;
  emailFormat: RegExp;
  phoneNumberRegex: RegExp;
}

export const REG_EX: IREG_EX = {
  usernameFormat: /^[a-zA-Z]+[a-zA-Z0-9_.]*$/,
  emailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumberRegex: /^[6789]\d{9}$/,
};
