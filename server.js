const Hapi = require('hapi')
const got = require('got')

const server = new Hapi.Server()

const fetchFeed = async () => {
  const response = await got('http://www.f4wradio.com/feed/wor.rss')
  return response.body
}

const updateFeedURLs = async() => {
  const feed = await fetchFeed()
  return feed.replace(/http:\/\/www.f4wradio.com/g, process.env.DOMAIN)
}

const generateStream = (id) => {
  const authHash = new Buffer(`${process.env.USERNAME}:${process.env.PASSWORD}`).toString('base64')
  return got.stream(`http://www.f4wradio.com/podcast/${id}.mp3`, {
    headers: {
      'user-agent': 'F4WF (https://github.com/marcus-crane/f4wforwarder)',
      'Authorization': `Basic ${authHash}`
    }
  })
}

server.connection({
  host: 'localhost',
  port: 9999
})

server.route({
  method: 'GET',
  path: '/',
  handler: ((request, reply) => {
    reply('Point your favourite podcasting app at <a href="/wor.rss">wor.rss</a>')
  })
})

server.route({
  method: 'GET',
  path: '/wor.rss',
  handler: (async (request, reply) => {
    reply(await updateFeedURLs()).type("text/xml")
  })
})

server.route({
  method: 'GET',
  path: '/podcast/{id}.mp3',
  handler: ((request, reply) => {
    reply(null, generateStream(request.params.id))
  })
})

server.start((err) => {
  if (err) throw err
  console.log(`Server running at ${server.info.uri}`)
})