var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&"
var prefix = "https://cors-anywhere.herokuapp.com/"

function getQuote() {
    fetch(prefix + quoteUrl + randomString(), { cache: "no-store" })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    var data = input[0];

    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
    	getQuote();
	} else {
	    var tweet = tweetLink + encodeURIComponent(tweetText);
	    document.querySelector('.quote').innerText = quoteText;
	    document.querySelector('.author').innerText = "Author: " + quoteAuthor;
	    document.querySelector('.tweet').setAttribute('href', tweet);
	}
}

document.addEventListener('DOMContentLoaded', function() {
    getQuote();
    document.querySelector('.trigger').addEventListener('click', function() {
        getQuote();
    });
});

function randomString() {
    var chars = '0123456789';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}