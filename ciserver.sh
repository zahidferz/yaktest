# !/bin/bash

start the server and send the console and error logs on nodeserver.log
npm run ci > nodeserver.log 2>&1 &
# keep waiting until the server is started
while ! grep "App is served in production mode." nodeserver.log
do
  tail nodeserver.log
  sleep .1
done
export CIP=$(curl -s https://checkip.amazonaws.com)
echo -e "The server has started in the $CIP:8080 \n"
sleep 60
exit 0
