# Guide

## Install yarn

```sh
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb http://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

Link to yarn: <https://yarnpkg.com/en/docs/install>

## Installing and Running

```sh
# Install Node Modules
yarn install

# Start the Server
yarn start

# If you want to edit the react code, this rebuilds
yarn run watch-files
```

## FILE SIZE UPLOAD

MAX: 20 MB MIN: 0.1 MB
