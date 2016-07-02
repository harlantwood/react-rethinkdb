// Import third-party libraries (managed by npm and webpack)
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRethinkdb = require('react-rethinkdb');
var r = ReactRethinkdb.r;
var QueryRequest = ReactRethinkdb.QueryRequest;
import Rethinkable from './Rethinkable';

// Open a react-rethinkdb session (a WebSocket connection to the server)
ReactRethinkdb.DefaultSession.connect({
  host: 'localhost', // hostname of the websocket server
  port: 8015,        // port number of the websocket server
  path: '/db',       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'test',        // default database, passed to rethinkdb.connect
});

const session = component => component.props[name];

@Rethinkable(session)
class App extends React.Component {

  observe (props, state) {
    return {
      turtles: new QueryRequest({
        query: r.table('turtles'),
        changes: true
      })
    };
  }

  render () {
    return (
      <ul>
        {this.data.turtles.value().map(turtle => (
          <li key={turtle.id}>{turtle.name}</li>
        ))}
      </ul>
    );
  }
}

// Render the App component into the <div id="app"> element on index.html
ReactDOM.render(<App />, document.getElementById('app'));
