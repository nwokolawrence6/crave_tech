import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

class db {
  public connect (DB_URL: string) {
    const log = console
    const isConnected:boolean = mongoose.connection.readyState === 1
    const isConnecting:boolean = mongoose.connection.readyState === 2
    if(isConnecting) {
      return console.log('Connecting to database')
    }
    if(isConnected) {
      // return console.log('database Already Connected')
    }
    mongoose.connection.once('disconnected', () => {
      log.error(`Successfully disconnected from ${DB_URL}`)
    })
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        log.error('dBase connection closed due to app termination')
        process.exit(0)
      })
    })
    return mongoose.connect(DB_URL, options)
      .then(async () => {
        log.info(`Successfully connected to ${DB_URL}`)
      })
      .catch((err:any) => {
        log.error(`There was a db connection error ${err}`)
        process.exit(0)
      })
  }
}

export default db
