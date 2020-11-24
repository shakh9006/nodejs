const cors            = require('cors')
const config          = require('./config')
const express         = require('express')
const bodyParser      = require('body-parser')
const ftpRoutes       = require('./routes/ftps')
const adminRoutes     = require('./routes/admin_access')
const serverRoutes    = require('./routes/servers')
const websiteRoutes   = require('./routes/website')
const sshAccessRoutes = require('./routes/ssh_access')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use('/api/v1/ftp', ftpRoutes)
app.use('/api/v1/server', serverRoutes)
app.use('/api/v1/website', websiteRoutes)
app.use('/api/v1/ssh-access', sshAccessRoutes)
app.use('/api/v1/admin-access', adminRoutes)

app.listen(config.port, () => {
    console.log(`Server is running at ${config.host_url}`)
})