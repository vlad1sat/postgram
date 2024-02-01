const express = require('express');

const app = express();
const port = 5000;
app.get('/', (req: any, response : any) => {
    response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));