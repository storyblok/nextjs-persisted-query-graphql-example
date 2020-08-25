import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import withApollo from 'next-with-apollo'
import { createHttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import fetch from 'isomorphic-unfetch'

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_URL = 'https://gapi.storyblok.com/v1/api'

const link = createPersistedQueryLink({useGETForHashedQueries: true}).concat(createHttpLink({
  fetch, // Switches between unfetch & node-fetch for client & server.
  uri: GRAPHQL_URL,
  headers: {
    'Token': 'QBmPtomvbW9LsjuHFiUCtgtt',
    'Version': 'published',
    'Accept': 'application/json'
  }
}))

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: link,
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {})
    })
)