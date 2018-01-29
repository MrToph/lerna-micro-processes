import config from "./config";
import ipc from "node-ipc";
import steem from "steem";

ipc.config.id = config.id;
ipc.config.retry = config.retry;

ipc.serve(function() {
  ipc.server.on(`socket.disconnected`, function(socket, destroyedSocketID) {
    ipc.log(`client ` + destroyedSocketID + ` has disconnected!`);
  });
});

ipc.server.start();

steem.api.setOptions({ url: process.env.STEEM_NODE });
steem.api.streamOperations((err, res) => {
  if (err) {
    return;
  }

  const type = res[0];
  const data = res[1];
  ipc.server.broadcast(type, data);
});
