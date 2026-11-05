#!/bin/zsh
cd -- "${0:A:h}"
npm run sync && npm run build && npm run preview -- --port 4321
if [[ $? -eq 0 ]]; then
  open 'http://127.0.0.1:4321/'
else
  read -r '?操作未完成，请查看上面的提示。按回车关闭。'
fi
