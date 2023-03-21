import express from "express";
import routes from './routes';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express()

// Configurations
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Thumbnail Generator API",
      version: "1.0"
    },
    servers: [
      { url: `http://localhost:3001` }
    ]
  },
  apis: ["src/routes/index.ts"]
}

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


// Routes
app.use('/', routes);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

export default app;