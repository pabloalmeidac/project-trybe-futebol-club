import * as Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
}).messages({
  'any.required': '400|{{ #label }} is required',
  'string.base': '400|{{ #label }} must be a string',
  'string.email': '400|{{ #label }} must be a valid email',
  'string.min': '400|{{ #label }} length must be at least {{ #limit }} characters long',
});