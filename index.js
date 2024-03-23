const mainContentSection = document.getElementById('main');

function fetchAndParseRSS(url) {
    // Prepending a CORS proxy to the RSS feed URL
    const proxyUrl = 'https://proxy.cors.sh/';
    const fullUrl = proxyUrl + url;

    fetch(fullUrl, {
        headers: {
        'x-cors-api-key': 'X-COR-API-KEY_WILL-GO_HERE'
        }
    })
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        let parsedItems = [];

        items.forEach(item => {
          parsedItems.push({
            title: item.querySelector("trading-name").textContent,
            price: item.querySelector("price").textContent,
            address: item.querySelector("address").textContent,
            suburb: item.querySelector("location").textContent,
          });
        });

        const renderDivsHtml = parsedItems.map(servo => {
            return `<div class="fuel-location-wrapper">
                <p>${servo.title}</p>
                <p>${servo.price}</p>
                <p>${servo.address}</p>
                <p>${servo.suburb}</p>
            </div>`
        });

        mainContentSection.innerHTML = renderDivsHtml.join(' ');
        console.log(renderDivsHtml);

        // Now, parsedItems contains the RSS feed data in a JSON-like format
        console.log(parsedItems);
      })
      .catch(err => console.error("Failed to fetch or parse the RSS feed:", err));
  }

  // Example usage
  fetchAndParseRSS('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Product=1&Suburb=Geraldton');