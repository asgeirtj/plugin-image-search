function search_images_via_google(params, userSettings) {
  var keyword = params.keyword;
  var cx = userSettings.searchEngineID;
  var key = userSettings.searchEngineAPIKey;

  if (!cx || !key) {
    throw new Error(
      'Please set the Search Engine ID and API Key in the plugin settings.'
    );
  }

  let url = `https://www.googleapis.com/customsearch/v1?q=${keyword}&cx=${cx}&key=${key}&searchType=image`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(
          'Cannot search images. Make sure you have enable Image Search in your Google Search Engine settings.'
        );
      }
      return data.items.map((item) => ({
        title: item.title,
        snippet: item.snippet,
        imageURL: item.link,
      }));
    });
}
