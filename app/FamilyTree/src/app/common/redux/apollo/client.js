import ApolloClient, { createNetworkInterface } from 'react-apollo';
// import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'
import { AsyncStorage } from 'react-native'
//import config from '../config.json';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cjhqnh4n869vt0113z8kp646q',
});

networkInterface.use([{
  async applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

   // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('token')
    console.log("token - ", token)
    if (!!token) {
      req.options.headers.authorization = `Bearer ${token}`;
    }
    next();
  },
}]);
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
// export const wsClient = new SubscriptionClient(`wss://subscriptions.ap-northeast-1.graph.cool/v1/cjf6qzg652ivd0113qx2h0wdt`, {
//   reconnect: true
// })

//   connectionParams: {
//     // Pass any arguments you want for initialization
//   }

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// )

export default new ApolloClient({networkInterface});



