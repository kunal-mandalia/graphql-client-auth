/**
 * Is process.env not available client side?
 * Expose through webpack?
 * 
 * How to access process.env in create react app?
 */
export const GRAPHQL_ENDPOINT = process.env.NODE_ENV === 'production' 
  ? 'https://graphql-server-auth.herokuapp.com/private/graphql'
  : 'http://localhost:4001/private/graphql'
