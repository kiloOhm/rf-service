import axios from 'axios';
import express from 'express';

const port = 10000;
var app = express();
app.use(express.json());

app.get('/healthz', function (req, res) {
  res.send("I'm alive!");
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers['origin'] ?? "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

app.post('/', async function (req, res) {
  const servers = req.body?.servers;
  if(!servers || Object.keys(servers).length === 0) {
    res.status(400).send("No servers provided");
  }
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
    output[server] = {
      players: result.data.players,
      maxplayers: result.data.maxplayers,
      sleepers: result.data.sleepers,
    };
  }
  res.send(output);
})

app.listen(port, () => console.log(`listening on port ${port}!`));