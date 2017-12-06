// Figure out which set of credentials to return
if(process.env.NODE_ENV  === 'production') {
    // in prod
    module.exports = require('./prod');
} else {
    // in test/dev
    module.exports = require('./dev');
}