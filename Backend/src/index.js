import * as dotenv from 'dotenv'
dotenv.config()
import app from './server.js';
import logger from "./modules/logger.js"

const port = 7777;

app.listen(port, () => {
    logger.info(`listening on http://localhost:${port}`);
})