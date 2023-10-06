
import { createClient } from 'redis';

// function to store 

let redisClient: any;

async function createRedisClient() {


   redisClient = createClient();
   redisClient.on('error', err => { redisClient = null; });
   
   await redisClient.connect();
   console.log('Redis Client Connected');
}


export { createRedisClient, redisClient };
