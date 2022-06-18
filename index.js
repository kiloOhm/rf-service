import axios from 'axios';
import express from 'express';
const port = process.env.PORT || 80;
var app = express();

const servers = {
  Roleplay: "54.39.130.212:28015",
  Vanilla: "54.39.130.212:28015",
  "Vanilla Kits": "54.39.130.212:28015"
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers['origin'] ?? "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PATCH, PUT");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

app.get('/', async function (req, res) {
  const output = {};
  for(const server in servers) {
    const url = servers[server];
    let result;
    try {
      result = await axios.get(`http://${url}/status.json`);
    } catch(e) {
      console.log(e);
      continue;
    }
    console.log(result.data);
    output[server] = {
      players: result.data.players,
      maxplayers: result.data.maxplayers,
      sleepers: result.data.sleepers,
    };
  }
  res.send(output);
})

app.get('/healthz', function (req, res) {
  res.send('OK');
})

app.listen(port, () => console.log(`listening on port ${port}!`));