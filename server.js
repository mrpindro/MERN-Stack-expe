const express = require('express');
const app = express();
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const PORT = process.env.PORT || 5500;

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use('/', require('./routes/root'));

app.use('/*', (req, res) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ 'message': 'Page Not Found'});
    } else if (req.accepts('txt')) {
        res.send('Page not Found');
    }
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
