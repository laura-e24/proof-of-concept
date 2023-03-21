import app from "./src/app"

app.listen(3001, () => {
  console.log(`🚀 [Server] running on: http://localhost:3001`)
  console.log(`📑 [Documentation] available at: http://localhost:3001/api/v1/docs`)
})