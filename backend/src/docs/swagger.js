const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CloudOrders API',
      version: '1.0.0',
      description:
        'API REST do projeto CloudOrders, desenvolvida para a disciplina de Desenvolvimento de Software em Nuvem. A aplicação permite autenticação de usuários, controle de acesso por perfil e gerenciamento de produtos.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        RegisterBody: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Anderson'
            },
            email: {
              type: 'string',
              example: 'anderson@email.com'
            },
            password: {
              type: 'string',
              example: '123456'
            },
            role: {
              type: 'string',
              example: 'user'
            }
          }
        },
        LoginBody: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'admin@email.com'
            },
            password: {
              type: 'string',
              example: '123456'
            }
          }
        },
        ProductBody: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              example: 'Notebook'
            },
            price: {
              type: 'number',
              example: 3500
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;