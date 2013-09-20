var request = require("request");
var S = require("string");
var cheerio = require("cheerio");
var moment = require("moment");

moment().format();

exports.getUsersLatestTweets = function getUsersLatestTweets(username, callback) {

    var tweets = [];

    request("https://twitter.com/i/profiles/show/" + username + "/timeline/with_replies?include_available_features=1&include_entities=1", function(error, response, body) {
    
        if (!error && response.statusCode == 200) {
            jsonDoc = JSON.parse(body);
            $ = cheerio.load(jsonDoc.items_html);
            $(".original-tweet").each(function(i, el) {
                var text = $(el).find(".tweet-text").text();
                var tweet_id = $(el).attr("data-tweet-id");
                var time = $(el).find(".js-relative-timestamp").attr("data-time");
                var relativeTime = moment.unix(time).fromNow();
                var obj = {
                    text: text,
                    tweet_id: tweet_id,
                    time: time,
                    relativeTime: time
                };
                tweets.push(obj);
            });
            callback(tweets);
        }

    });
};

exports.getTweetFaves = function getTweetFaves(id, callback) {

    var users = [];
    
    request("https://twitter.com/i/activity/favorited_popup?id=" + id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonDoc = JSON.parse(body);
            var favCount = S(jsonDoc.htmlTitle).between("Favorited", "times").trim().s;
            $ = cheerio.load(jsonDoc.htmlUsers);
            $(".js-stream-item > .js-actionable-user").each(function(i, el) {
                var user = {};
                user.username = $(el).attr("data-screen-name");
                user.user_name = $(el).find(".user-actions").attr("data-name");
                user.user_id = $(el).attr("data-user-id");
                user.protected = $(el).find(".user-actions").attr("data-protected") == "true";
                user.followers = parseInt($(el).find(".followers-count > strong").text());
                users.push(user);
            });
            var obj = {
                count: favCount,
                users: users
            };
            callback(obj);
        }
    });
};