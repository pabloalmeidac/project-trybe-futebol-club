import * as Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
}).messages({
  'any.required': '400|All fields must be filled',
  'string.base': '401|Incorrect email or password',
  'string.email': '401|Incorrect email or password',
  'string.min': '401|Incorrect email or password',
});