export class DuplicateEmailError extends Error {
  constructor() {
    super("Email duplicado");
  }
}
