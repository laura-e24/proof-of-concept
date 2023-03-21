import express from 'express';
import { thumbnailGenerator } from '../controllers';

const router = express.Router()

/** 
 * @swagger 
 *   components: 
 *     schemas:
 *      ServerError:
 *        type: string
 *        example: 
 *          Internal Server Error.
 *      FileExtensionError:
 *        type: string
 *        example: 
 *          File extension must be either PNG or JPEG.
 *      BigFileError:
 *        type: string
 *        example: 
 *          File size must not exceed 11MB.
 *      Thumbnail:
 *        type: string
 *        example: 
 *          C:\Users\youruser\Documents\proof-of-concept\thumbnail-generator-api\thumbnails\mock-lg.png
 */ 

/** 
 * @swagger 
 * paths:
 *   /: 
 *     post:
 *      summary: Generates three thumbnails with different sizes from source image and returns their URLs.
 *      tags: [Thumbnails]
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                img:
 *                  type: string
 *                  format: binary
 *              required:
 *                - img
 *      produces:
 *        - application/json
 *        - text/plain
 *      responses:
 *        500:
 *          description: There's been an unexpected error
 *          content:
 *            text/plain:
 *              schema:
 *                type: string
 *                $ref: '#/components/schemas/ServerError'
 *        400:
 *          description: Image could not be processed due to file size exceeds 11MB
 *          content:
 *            text/plain:
 *              schema:
 *                type: string
 *                $ref: '#/components/schemas/BigFileError'
 *        415:
 *          description: Image could not be processed since it is not a PNG or JPEG file.
 *          content:
 *            text/plain:
 *              schema:
 *                type: string
 *                $ref: '#/components/schemas/FileExtensionError'
 *            
 *        200:
 *          description: Images were processed and resized successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Thumbnail'
 */ 
router.post('/', thumbnailGenerator)
export default router;