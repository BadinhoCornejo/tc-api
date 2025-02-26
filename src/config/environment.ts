import * as dotenv from "dotenv";
import "process";

dotenv.config({ path: `${__dirname}/../../.env` });

export default process.env;
