const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const http = require('http');
const API = `api`;
// const request = require('request');
require('dotenv').config();
var Amadeus = require('amadeus');
var amadeus = new Amadeus({
  clientId: 'OLP6tB9aFeIpyaopSTMyQunbt38KGDJO',
  clientSecret: 'GKsxPJh0dqbXkvoR'
});

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI

const configuration = new Configuration({
  organization: "org-fLD1ODJC3ivLHMAP7woVGSaX",
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { destination, days, flight1, flight2 } = req.body;

  // Generate response from OpenAI
  const openAiResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `
create a travel plan in ${destination} for mentioned number of days.
mentioned days:${days}`,
    max_tokens: 1000,
    temperature: 0
  });

  // Log OpenAI response
  console.log(openAiResponse.data);
  // console.log("OpenAI Response: ", data.openAiResponse);
  // Get response from Amadeus API
  const amadeusResponse= amadeus.shopping.flightOffersSearch.get({
    originLocationCode: flight1,
    destinationLocationCode: flight2,
    departureDate: '2023-02-25',
    adults: '2',
    max: '1'
  }).then(function (amadeusResponse) {
    // Log Amadeus response
    console.log(amadeusResponse.data);

    // Send both responses to the frontend
    res.json({
      openaiResponse: openAiResponse.data,
      amadeusResponse: amadeusResponse.data
    });
  }).catch(function (responseError) {
    console.log('Amadeus Error:', responseError);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
