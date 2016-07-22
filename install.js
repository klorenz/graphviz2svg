var spawnSync = require('child_process').spawnSync
var execSync = require('child_process').execSync
var exec = require('child_process').exec
var fs = require('fs')
var path = require('path');
/*
    Press Command+Space and type Terminal and press enter/return key.
    Run in Terminal app:
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
    and press enter/return key. Wait for the command to finish.
    Run:
    brew install plotutils perl ghostscript
*/

function install() {
  if (process.platform == 'linux') {
    if (!spawnSync('apt-get', ['-v']).error) {
      console.log("apt-get install graphviz")
      p = exec("apt-get install graphviz")
      p.stderr.pipe(process.stderr)
      p.stdout.pipe(process.stdout)

    } else {
      console.log("sorry only apt-get supported right now for automatic install")
      console.log("You have to install the following packages:")
      console.log("  - graphviz")
    }
  } else if (process.platform == 'darwin') {
    if (!spawnSync('brew', ['-v']).error) {
      console.log("brew install graphviz")
      p = exec("brew install graphviz")
      p.stderr.pipe(process.stderr)
      p.stdout.pipe(process.stdout)
    } else {
      console.log("You have to install Homebrew from http://brew.sh first")
    }
  } else {
    console.log("Sorry, your system is not supported for automatic install")
    console.log("You have to install the following packages:")
    console.log("  - graphviz")
  }
}

if (require.main === module) {
  install()
}

module.exports = install
