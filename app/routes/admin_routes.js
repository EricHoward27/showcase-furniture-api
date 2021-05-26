const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
// // instantiate a router (mini app that only handles routes)
// const router = express.Router()
const mongoose = require('mongoose')
const AdminBroMongoose = require('@admin-bro/mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  password: process.env.ADMIN_PASSWORD || 'password'
}
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_Cookie_Name || 'admin-bro',
  cookiePassword: process.env.ADMIN_Cookie_Pass || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async(email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})
module.exports = router