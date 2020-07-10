import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import compression from 'compression'
import requestId from 'express-request-id'

import mongoose from 'mongoose'

import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swaggerJsDoc'

import { config } from './config'
import routes from './routes'

class Application {
  public app: express.Application

  constructor () {
    this.app = express()

    this.database()
    this.middlewares()
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    this.app.use(requestId())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.trace(
        { req, requestId: req.headers['X-Request-Id'] },
        'A new request received at' + Date.now(),
        res.json()
      )
      next()
    })

  }

  private database (): void {
    mongoose.connect(
      config.databaseUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    )

    mongoose.Promise = global.Promise;

    // On connection error
    mongoose.connection.on("error", (error) => {
      console.log("Database error: ", error);
    });

    // On successful connection
    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });

  }

  private routes(): void {
    this.app.use(routes)
  }
}

export default new Application().app
