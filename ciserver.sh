# !/bin/bash

start the server and send the console and error logs on nodeserver.log
ufw allow 8080/tcp
npm run dev > nodeserver.log 2>&1 &
# keep waiting until the server is started
while ! grep "Note that the development build is not optimized." nodeserver.log
do
  tail nodeserver.log
  sleep .1
done
export CIP=$(curl -s https://checkip.amazonaws.com)
echo -e "The CI server has started in the $CIP:8080 \n"
sleep 60
exit 0
