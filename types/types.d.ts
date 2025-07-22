import { Connection } from "mongoose";


declare global {
    var mongoose :{
        conn:Connection | null ;
        promise: Promise<Connection> | null
    }
}

export {}


/**************** DATABASE CONNECTION ARCHITECTURE & WHY WE CACHE IN NEXT.JS *****************

1. Next.js doesn't use a single persistent backend server like traditional MERN apps. 
   It deploys functions globally as serverless endpoints (e.g., AWS Lambda).

2. Each time a request hits a new region or cold serverless instance, a new runtime is initialized.

3. Without caching, every request would create a new MongoDB connection — which can exhaust MongoDB Atlas limits.

4. That's why we use a global variable (global.mongoose) to cache:
    - The connection object (`conn`)
    - The in-progress connection (`promise`) to prevent duplicate parallel connections

5. This leads to a 3-state model:
    - `conn = null`, `promise = null`: → No connection yet
    - `conn = null`, `promise = Promise`: → Connecting
    - `conn = Connection`: → Ready to use

This pattern ensures efficient DB usage in serverless environments like Next.js.

**************************************************************************************/
