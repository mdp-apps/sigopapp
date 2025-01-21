export const REGEX = {
  rut: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
  rutWithoutDots: /^\d{8}-[\dkK]$/,
  cleanRut: /[^\dkK]/g,
  dotsInRut: /\B(?=(\d{3})+(?!\d))/g,
};
