import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Study Abroad CRM API',
      version: '0.1.0',
      description: 'REST API for the Study Abroad CRM',
    },
  },
  apis: ['./src/modules/**/*.routes.ts'],
});
