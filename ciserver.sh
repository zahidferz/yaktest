# !/bin/bash

start the server and send the console and error logs on nodeserver.log
sudo -- sh -c -e "ufw disable"
export CIP=$(curl -s https://checkip.amazonaws.com)
npx vue-cli-service serve --host 0.0.0.0 --port 8089 > nodeserver.log 2>&1 &
# keep waiting until the server is started
while ! grep "To create a production build, run npm run build." nodeserver.log
#while [ 1 = 1 ]
do
  tail nodeserver.log
  sleep .1
done
export CIP=$(curl -s https://checkip.amazonaws.com)
echo -e "The CI server has started in the $CIP:8080 \n"
sleep 20
exit 0
