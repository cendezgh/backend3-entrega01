import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'API para gestionar usuarios',
    },
    servers: [ 
      {
        url: 'http://localhost:8080', 
        description: 'Servidor de desarrollo', 
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'ID del usuario' },
            first_name: { type: 'string', description: 'Nombre del usuario' },
            last_name: { type: 'string', description: 'Apellido del usuario' },
            email: { type: 'string', description: 'Correo electrónico del usuario' },
            age: { type: 'integer', description: 'Edad del usuario' },
            role: { type: 'string', description: 'Rol del usuario' },
          },
        },
        NewUser: {
          type: 'object',
          properties: {
            first_name: { type: 'string', description: 'Nombre del usuario' },
            last_name: { type: 'string', description: 'Apellido del usuario' },
            email: { type: 'string', description: 'Correo electrónico del usuario' },
            age: { type: 'integer', description: 'Edad del usuario' },
            password: { type: 'string', description: 'Contraseña del usuario' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/user.router.js'], 
};

export const swaggerSpec = swaggerJSDoc(options);

