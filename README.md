# F4W Forwarder

This is a little [hapi.js](https://hapijs.com/) server that re-serves [Dave Meltzer](https://twitter.com/davemeltzerWON)'s famous [Wrestling Observer Radio](http://www.f4wonline.com/radioshow-archive)

Note: I think I just rate limited so don't go too nuts. This should still work but it's "broken" now at least for me. Maybe you'll have better luck.

# What is this, like a piracy thing?

Nope! The WON radio requires you to have an active subscription to listen to (and I have one) but unfortunately, a lot of podcasting apps don't support authenticated/private streams.

I normally use [Pocket Casts](https://www.shiftyjelly.com/pocketcasts/) but they don't support, nor plan to support, private streams. I tried a couple of others which worked fine but either had ugly or ad riddled UI (or both!)

Fed up with my options, I realised that since the mp3s themselves are just streams, I can just have a small server do the authentication server side rather than being bugged on the client side giving the illusion of a public podcast and letting me go back to Pocket Casts.

# But aren't you distributing this meaning others can steal Dave's stuff?

Not at all! This code is for personal use only and you need an account anyway if you want to run it yourself. His streams are uploaded to YouTube often but if you enjoy his work, you should support him and the F4W team with a subscription. They're not even that expensive considering how much content they churn out weekly.

# How do I use it

First up, you'll need to have [Node](https://nodejs.org/) installed. Either a `sudo apt-get install node` or a `brew install node` should set you up. If you're on Windows, uhh, I guess check out the [official website](https://nodejs.org/)?

You'll need to check that you're running v7.7.4 or above as this uses async/await

`node -v` will return your current version number.

Copy `example.env` to `.env` and fill in the placeholders. Here's an example:

```
DOMAIN=http://mycoolwebsite.com
USERNAME=davemeltzer
PASSWORD=supersecure123
```

Your username and password are combined and sent with the request because the actual audio files themselves require Basic Authorization (the popup prompt you get with things like routers) to access.

Once that's done, all you need to do is run `npm install` followed by `npm start`. You'll need to deploy it to a server for it to be useful outside of your own local network.

I'll assume you know how to figure that part out otherwise try looking into something like [Heroku](http://heroku.com)

# How do I use it (tl;dr)

```
brew install node / sudo apt-get install node
node -v (check that it's at least 7.7.4)
npm install
cp example.env -> .env
npm start
```

You'll need to deploy it to a server if you want to access files outside of your house. A Raspberry Pi + router forwarding would probably work perfectly.

# Will I be sports entertained after using this code?

Why aren't you watching the G1 Climax instead of reading this? I swear to god, Dave better not have a heart attack after Omega x Okada 3