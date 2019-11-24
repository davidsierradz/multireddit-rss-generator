require("dotenv").config();
const snoowrap = require("snoowrap");
const feedLibrary = require("feed");

const r = new snoowrap({
  userAgent: process.env.USER_AGENT,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.USER_AGENT,
  password: process.env.PASSWORD
});

// Add your desired subreddits to this array:
const subredditsList = ["worldnews", "funny", "politics"];

async function* asyncGenerator() {
  let i = 0;
  while (i < subredditsList.length) {
    yield subredditsList[i];
    i++;
  }
}

(async function() {
  let hotPosts = [];
  for await (let subreddit of asyncGenerator()) {
    hotPosts.push(await r.getHot(subreddit));
  }
  hotPosts = hotPosts.flat();
  const feed = new feedLibrary.Feed({
    title: "Some title",
    description: "This is my personal feed!",
    id: "http://example.com/",
    link: "http://example.com/",
    image: "https://www.redditstatic.com/icon.png/",
    favicon: "https://www.redditstatic.com/icon.png/",
    copyright: "All rights reserved 2019, Foo Bar",
    feedLinks: {
      json: "https://example.com/json",
      atom: "https://example.com/atom"
    },
    author: {
      name: "Foo Bar",
      email: "foobar@example.com",
      link: "https://github.com/foobar"
    }
  });
  hotPosts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: `<a href="https://old.reddit.com${post.permalink}">https://old.reddit.com${post.permalink}</a>`,
      content: post.selftext_html,
      date: new Date(post.created * 1000),
      image: post.image
    });
  });
  feed.addCategory("Category");
  console.log(feed.rss2());
})();
