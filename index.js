import axios from 'axios';
import express from 'express';
var app = express();

const servers = {
  Roleplay: "54.39.130.212:28015",
  Vanilla: "54.39.130.212:28015",
  "Vanilla Kits": "54.39.130.212:28015"
}

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

app.listen(80);