function fetchAndParseRSS(url) {
    // Prepending a CORS proxy to the RSS feed URL
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const fullUrl = proxyUrl + url;

    fetch(fullUrl)
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        let parsedItems = [];

        items.forEach(item => {
          parsedItems.push({
            title: item.querySelector("title").textContent,
            link: item.querySelector("link").textContent,
            description: item.querySelector("description").textContent,
            publicationDate: item.querySelector("pubDate").textContent,
          });
        });

        // Now, parsedItems contains the RSS feed data in a JSON-like format
        console.log(parsedItems);
      })
      .catch(err => console.error("Failed to fetch or parse the RSS feed:", err));
  }

  // Example usage
  fetchAndParseRSS('http://example.com/feed.xml');