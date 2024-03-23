const fetch = require('node-fetch');
const DOMParser = require('xmldom').DOMParser;

exports.handler = async (event) => {
  const url = event.queryStringParameters.url; // The actual API URL is passed as a query parameter

  try {
    const response = await fetch(url); // Directly fetch the URL without a CORS proxy
    const text = await response.text();
    const data = new DOMParser().parseFromString(text, 'text/xml');

    // Parse the XML as needed to construct the response object


    return {
      statusCode: 200,
      body: JSON.stringify(parsedItems),
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};