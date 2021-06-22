# Xmeme

A Web Application to post and see Memes.

## Live Demo
https://xmeme-rahil.herokuapp.com/

## Requirements

To run this application, you need node.js/express.js installed in your system.

### Node
- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download node.js.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

    $ sudo apt install nodejs
    $ sudo apt install npm
      
If the installation was successful, you should be able to run the following command.

    $ node --version
    $ npm --version
    
## Install

    $ git clone https://github.com/rahil-1407/Xmeme.git
    $ cd PROJECT_TITLE
    
## Dependencies

Download the necessary dependencies using the following commands

    $ npm install express
    $ npm install nodemon -D
    $ npm install ejs
    $ npm install meanie-mongoose-to-json
    $ npm install mongoose
    
## Database
 
Database Used is MongoDB Atlas.

## API Endpoints

- Endpoint to send a meme to the backend:The backend allocates a unique id for the meme and return it as a json response. <br />
Example request <br />
      `curl --location --request POST 'http://<Server_URL>/memes' \
      --header 'Content-Type: application/json' \
      --data-raw '{
      "name":"ashok kumar",
      "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
      "caption": "This is a meme"
      }'
    ` 
    Sample response<br />
      `{
      "id": "1"
      }
      `
- Endpoint to fetch the latest 100 memes created from the backend <br />
Example request <br />
    `curl --location --request GET 'http://<Server_URL>/memes'`
    `
    Response
    [
       {
    "id": "1",       
    "name": "MS Dhoni",
    "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
    "caption": "Meme for my place"
        },
        {
    "id": "2",
    "name": "Viral Kohli",
    "url": "https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg",
    "caption": "Another home meme"
        }
    ]`

- Endpoint to specify a particular id (identifying the meme) to fetch a single Meme. <br />
Example request <br />
    `curl --location --request GET 'http://<Server_URL>/memes/<id>'`
    `
    Response
    {
    "id": "1",       
    "name": "MS Dhoni",
    "url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",
    "caption": "Meme for my place"
    }
    `

