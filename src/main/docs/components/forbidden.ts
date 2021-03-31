export const forbidden = {
  description: 'Accesso Negado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }

}
