// Update with your config settings.

if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/mole'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    }
  }

};
