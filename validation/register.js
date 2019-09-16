const Validator = require("validator");

const isEmpty = require("./is-empty");
const validate = data => {
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  let errors = {};
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "The name length should be 2 to 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  if (!Validator.isLength(data.password, { min: "6", max: "30" })) {
    errors.password = "password should be between 6 and 30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password2 = "password2 is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords should match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validate;
