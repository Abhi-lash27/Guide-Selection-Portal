import * as dotenv from 'dotenv'
dotenv.config()
import app from './server.js';

const port = 7777;

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
})