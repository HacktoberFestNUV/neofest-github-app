import express from 'express';
import { CLIENT_ID, CLIENT_SECRET } from './utils/creds';
import axios from 'axios';
import { addEmailTOOrg } from './src/AddEmail';
const app = express();
const port = 3000;
let token = null;
app.get('/', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=admin:org`
  );
});

app.get('/authenticated', (req, res) => {
  res.send('Authenticated!');
});

app.get('/oauth-callback', async (req, res) => {
  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
  };
  const opts = { headers: { accept: 'application/json' } };
  const resGit = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    opts
  );
  const token = resGit.data['access_token'];
  if (await addEmailTOOrg(token, 'mnimitsavant@outlook.com')) {
    res.redirect('http://localhost:3000/authenticated');
  }
});

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
