# !/bin/bash

# start the server and send the console and error logs on nodeserver.log
npm run dev > nodeserver.log 2>&1 &
# keep waiting until the server is started
while ! grep "App running at:" nodeserver.log
do
  tail nodeserver.log
  sleep .1
done
echo -e "server has started\n"
exit 0
