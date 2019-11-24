# Multireddit RSS Feed Generator

## Description

Little script to generate a RSS feed of hot posts for a list of subreddits.

## Requirements

- Nodejs
- yarn

## Installation

1. `yarn install`

## Configuration

First, go to [preferences (reddit.com)](https://old.reddit.com/prefs/apps/) and create a Reddit app (**personal use script**) and copy this app credentials:

1. `id`
2. `secret`

Copy `.env.example` to `.env` and put the previous info and your reddit credentials (user and password):

```sh
cp .env.example .env
cat > .env # or $EDITOR .env
USER_AGENT=some-unique-random-string
CLIENT_ID=your-app-id
CLIENT_SECRET=your-app-secret
USERNAME=your-reddit-username
PASSWORD=your-reddit-password
```

Also, edit `index.js` and add your subreddits list.

## Running

Just run and pipe `stdout` to a file:

```sh
node index.js > feed.xml
```

You can run this in a cronjob or systemd service in your machine or a server and expose this static file to any RSS client.

## License

See `LICENSE`
