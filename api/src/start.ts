import Application from './app'

const port = process.env.PORT || 3000

Application.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[SERVER] Running at port ${port}`)
  }
})
