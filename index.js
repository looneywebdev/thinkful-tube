//const with endpoint
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

//const with api key
const API_KEY = "AIzaSyBU9NN-ME1hn7dKlCcuHG5134kIxi2t4Xs"

// function that gets the data from api
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      type: 'video'
    },
    dataType: 'json',
    success: callback
  };
  $.ajax(settings);
}

//function that renders result content structure

function renderResult(result) {
  return `<div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}" alt= "${result.snippet.title}"/></a>
      <p>${result.snippet.title}</p>
    </div>`;
    
}

//function that displays data in html to the end user

function displayYoutubeSearchData(apiData) {

  const results = apiData.items.map(renderResult);
  $('.js-search-results').html(results);
}

//function that listens for submit event

function watchSubmit() {
  $('.js-search-form').submit(ev => {
    ev.preventDefault();
    // console.log("submit heard");
    const queryTarget = $(ev.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // console.log(query);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

//call jquery function for event listener

$(watchSubmit);