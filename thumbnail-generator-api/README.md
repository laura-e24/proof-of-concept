# Code Challenge: Thumbnail Generator API

## Instrucciones para utilizar la API
Abrir una terminal en la carpeta actual y utilizar el comando ```npm install```. Esto instalará todas las dependencias necesarias para correr la API, luego para iniciarla utilizar ```npm run dev```. El servidor comenzará a operar en el puerto 3001. No se requieren variables de entorno.

Para visualizar la documentación de la API ir a la ruta __http://localhost:3001/api/v1/docs__

Para correr los tests que validan la API usar el comando ```npm test```.

#### Probando la API:
##### 1. Primer método
Con el servidor en ejecución, abrir alguna herramienta de testeo de APIs tales como Postman o ThunderClient, hacer una petición POST al endpoint **http://localhost:3001**; en el *body* de la misma se debe enviar un *Form* con un campo de tipo *File* (la forma de hacer esto varía según el programa que usemos), esto habilitará un botón para seleccionar una imagen de nuestra computadora. Seleccionamos una y podremos ver la respuesta que nos devuelve el servidor, pudiendo ser de cuatro tipos:

##### 200: Todo salió correctamente
##### 400: No se pudo procesar la imagen dado que excede el máximo de tamaño admitido
##### 415: No se pudo procesar la imagen dado que el formato no es admitido por la API
##### 500: Error inesperado del servidor

##### 2. Segundo método
Con el servidor en ejecución, abrir la documentación (__http://localhost:3001/api/v1/docs__), hacer click en el único endpoint disponible, de tipo POST; luego en "Try it out", esto habilitará la subida de archivo. Clickear el botón junto al campo _"img"_ para seleccionar un archivo, una vez subido darle a "Execute" para enviar la petición y ver la respuesta que nos envía la API.

Finalmente, para ver los thumbnails generados por la API dirigirse a la carpeta "thumbnails".

#### Diagrama de la API
![alt text](https://github.com/laura-e24/proof-of-concept/blob/master/thumbnail-generator-api/diagram.png "Flowchart")
___

## Goal
Build a simple API that generates thumbnails from a source image

## Requirements
- The API should provide at least 1 endpoint where the user will be able to POST the original image
- The API must **ONLY** accept PNG and JPEG files
- The API must reject input file bigger than **11mb**
- The API should give the user 3 new images with the following dimensions
  - 400x300
  - 160x120
  - 120x120

## Grading Guidelines

### MVP (40 points)
- Every requirement is met
- The solution runs on our enviroment
- Tech Stack: **Node.js v16** (or highest) using **Typescript**
- Any ENV specific value should be configurable and documented
- Everything should work after following a simple README
- The code should be clear and easy to read / debug

### Nice moves (5 points each)
- It includes an **Architecture Diagram** to present your solution
- It includes **Swagger** or **Postman** documentation 
- It includes configuration files / scripts for deploying it on **AWS**
- It's serverless! (either **AWS Lambda + API Gateway** + **Dynamodb**)
- It relies on **CDK v2** or **Serverless Framework** (Infrastructure as Code)
- It's Dockerized for local development / testing
- It leverages cloud services (ie: AWS Cognito, Lambda, API Gateway, EventBridge, S3, SNS, SQS, etc...)
- It's asynchronic
- It's fast (<~500ms after upload finishes)
- It includes some kind of testing (unit tests, integration tests, etc) with at least 70% coverage
- It has an auth implementation (recommended: AWS Cognito or Auth0)

### Wait, WHAT?! (10 points each)
- It includes a configuration file / script to setup a CI/CD process on AWS
- It includes three different kinds of tests (unit, integration and performance)
