const mainContentSection = document.getElementById('main');

function fetchAndParseRSS(url) {
    // Call the Netlify function instead of the RSS URL directly
    fetch('/.netlify/functions/fetch-rss?url=' + encodeURIComponent(url))
      .then(response => response.json())
      .then(parsedItems => {
        const renderDivsHtml = parsedItems.map(servo => `
          <div class="fuel-location-wrapper">
            <p>${servo.title}</p>
            <p>${servo.description}</p>
            // Render more fields as needed
          </div>
        `);

        mainContentSection.innerHTML = renderDivsHtml.join('');
      })
      .catch(err => console.error("Failed to fetch or parse the RSS feed:", err));
}

// Example usage
fetchAndParseRSS('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=1&Suburb=Geraldton');