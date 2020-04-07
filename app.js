require('dotenv').config();
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('./public'));

const port = 3000;

const assistant = new AssistantV1({
  username: '',
  password: '',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-09-14',
});

app.post('/conversation/', (req, res) => {
  try {
    console.log('Chegou no servidor !');

    const { text, context = {} } = req.body;

    console.log('text = ', text);
    console.log('context = ', context);

    const params = {
      input: { text },
      workspace_id: 'c921db24-9648-4a93-b657-7d4d56969172',
      context,
    };

    console.log('assistant = ', assistant);

    assistant.message(params, (err, response) => {
      if (err) res.status(500).json(err);

      res.json(response);
    });
  } catch (e) {
    console.log('ERROR = ', e);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
