const redis = require('redis');
const client = redis.createClient()

client.on("error", (err) => {
  console.log("Erorr " + err);
});

client.set("string key", "string val", redis.print);