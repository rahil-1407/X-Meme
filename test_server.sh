chmod +x ./test_server.sh

chmod +x install.sh

sudo ./install.sh

chmod +x server_run.sh

./server_run.sh &

chmod +x sleep.sh

./sleep.sh

curl --location --request GET 'http://localhost:8081/memes'

curl --location --request POST 'http://localhost:8081/memes' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"xyz",
    "url":"https://static.mommypoppins.com/styles/image620x420/s3/school_meme_3_0.jpg",
    "caption":"This is a meme"
    }'

curl --location --request GET 'http://localhost:8081/memes'
