export const login = {
  correct: { email: 'teste@gmail.com', password: 'stringpassword' },
  emailIncorrect: { email: 'teste.com.br', password: 'stringpassword' },
  notStringPassword: { email: 'teste@gmail.com', password: 1231232 },
  passwordLength6: { email: 'teste@gmail.com', password: '123456' }
}

// 'any.required': '400|All fields must be filled', {}
// 'string.base': '401|Incorrect email or password', loginNotString
// 'string.email': '401|Incorrect email or password', loginEmailIncorrect
// 'string.min': '401|Incorrect email or password', passwordLength6