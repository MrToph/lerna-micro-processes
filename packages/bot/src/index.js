import ipc from 'node-ipc'
import ipcServerConfig from '@cmichel/broadcaster'

ipc.config.id = `steem.bot`
ipc.config.retry = 1500
ipc.config.silent = true

ipc.connectTo(ipcServerConfig.id, function() {
  ipc.of[ipcServerConfig.id].on(`connect`, function() {
    ipc.log(
      `## connected to ${ipcServerConfig.id} ##`.rainbow,
      ipc.config.delay
    )
  })
  ipc.of[ipcServerConfig.id].on(`disconnect`, function() {
    ipc.log(`disconnected from ${ipcServerConfig.id}`.notice)
  })
})

// listen to all comments (= posts + replies)
ipc.of[ipcServerConfig.id].on(`comment`, (data) => {
    ipc.log(`got a message from ${ipcServerConfig.id} : `.debug, data)

    // check for new posts only, no replies
    if (data.parent_author === ``) {
        console.log(`https://steemit.com/@${data.author}/${data.permlink}`)
    }
})
