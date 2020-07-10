import swaggerJSDoc from 'swagger-jsdoc'

const definition = {
  info: {
    title: 'Api Doc',
    version: '1.0.0',
    description: 'API REST using NodeJS and Express, Typescript, Mongoose. Middlewares JWT, CORS and Winston Logger.'
  },
  basePath: '/'
}

const options = {
  definition,
  apis: ['src/**/*.ts']
}

// Swagger
const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
