<a name="readme-top"></a>
# [DEPRECATED] DACN1-V001

<!-- TABLE OF CONTENTS -->
<details>
    <summary>Table of Contents</summary>
    <ul>
	    <li>
            <a href="#installation">Installation</a>
            <ul>
                <li><a href="#run-server-side"> Run Server Side</a></li>
                <li><a href="#run-client-side"> Run Client Side</a></li>
                <li><a href="#run-admin-side"> Run Admin Side</a></li>
            </ul>
        </li>
    </ul>
</details>

<!-- INSTRUCTION -->
# Installation

*Make sure you have Node.js installed*

Clone project:

```
git clone git@github.com/Alex2o9z/dacs4-002.git
```

## Run Server Side

Navigate to the "server" directory:

```
cd server
```

Install server dependencies (or not):

```
npm install
```

(It's already in this repo) Create a `.env` file in the `server` folder and set up the required environment variables:

```
MONGO_URI = your_mongodb_uri

SERVER_PORT = 5000
CLIENT_PORT = 3000
```

Start development server with nodemon:

```
npm run start
```

## Run Client Side

Navigate to the "client" directory:

```
cd client
```

Install client dependencies:

```
npm install
```

Start the react development server:

```
npm run start
```

Your client side is now ready at http://localhost:3000.

## Run Admin Side

Navigate to the "admin" directory:

```
cd admin
```

Install client dependencies:

```
npm install
```

Start the react development server:

```
npm run start
```
Choose yes [Y]

Your admin side is now ready at http://localhost:3001.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
