import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'
import moesif from 'moesif-nodejs'

const moesifMiddleware = moesif({
  applicationId: 'eyJhcHAiOiIxOTg6MTE1NCIsInZlciI6IjIuMCIsIm9yZyI6Ijg4OjE2NjgiLCJpYXQiOjE2MTQ1NTY4MDB9.uGW0eB8XrvtDT3JMP4lItmDlBJ8pzOCS5u4-plA2ZPU',

  // Optional hook to link API calls to users
  identifyUser: function (req, res) {
    return req.user ? req.user.id : undefined
  }
})

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(moesifMiddleware)
}
