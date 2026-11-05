#!/bin/zsh
cd -- "${0:A:h}"
npm run publish
read -r '?按回车关闭。'
