# notify-bridge

JSON-RPC notification bridge

notify-bridge transforms JSON-RPC notifications which it receives through POST requests
into socket.io events. Basicly this means you can use this as a bridge to send push notifications
out of PHP (or any other language) to your clients (=browsers).

Installation is quite simple if you have node installed:

    $ npm install -g https://github.com/xat/notify-bridge/tarball/master

Now you have a commandline tool called 'notify-bridge'. To get some an idea
about the configuration options type-in:

    $ notify-bridge --help

This will output:

    Usage: notify-bridge [options] --start

    Options:

      -h, --help                     output usage information
      -V, --version                  output the version number
      -s, --start                    Start the bridge
      -i, --input-modules <list>     The input Modules (default: notify-bridge-http)
      -o, --output-modules <list>    The output Modules (default: notify-bridge-socketio)
      -hi, --http-ip <string>        Bind the HTTP Server to an IP (default: 127.0.0.1)
      -hp, --http-port <string>      On which port should the HTTP Server listen (default: 4440)
      -ha, --http-auth <boolean>     Use Basic Authentication (default: false)
      -hu, --http-user <string>      Basic Authentication Username (default: admin)
      -hr, --http-password <string>  Basic Authentication Password (default: admin)
      -sp, --socketio-port <string>  On which port should the Socket.IO Server listen (default: 4450)

As you can see, all you have todo to start the bridge with
the default options is:

    $ notify-bridge --start

Emitting notifications is done by sending POST requests to the bridge. The POST request
must contain a field named 'rpc'. Within this field you send the JSON.
This is an example using Curl from the commandline to trigger a notification 'update':

    $ curl --data "rpc={\"method\":\"update\",\"jsonrpc\":\"2.0\"}" http://127.0.0.1:4440

If you are using PHP as Endpoint you can also checkout [notify-php](https://github.com/xat/notify-php/)
for sending notifications.

To Receive the notifications from within the browser you at first have to include socket.io Javascript:

```html
<script src="http://<your-host>:4450/socket.io/socket.io.js"></script>
```
Now create a connection to the bridge and listen for new notifications:

```javascript
var socket = io.connect('<your-host>:4450/');
socket.on('update', function(data) {
  console.log(data); // received a notification
});
```

## License
Copyright (c) 2012 Simon Kusterer  
Licensed under the MIT license.
