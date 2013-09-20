# StarryKnight
## Because Twitter really should have a documented favorites API

**Using this probably breaks Twitter's TOS. So you definitely shouldn't use it. Nope. Never. Ever.**

StarryKnight is a very simple Node module that gives you two methods. Those two methods are very self explanatory, but I put examples anyway.

**NOTE: I have not touched this code in months. It may not work perfectly. I might be able to fix it if you drop me a tweet.**

---

### Examples

	var StarryKnight = require('StarryKnight')

	StarryKnight.getUsersLatestTweets('ws', function(tweets){
		console.log(tweets)
	})
	
	StarryKnight.getTweetFaves('380862378214457347', function(users){
		console.log(users)
	})