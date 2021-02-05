if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prodS3');
} else {
    module.exports = require('./devS3');
}