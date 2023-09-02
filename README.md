## This is only a local setup (with a docker mongo), without using a mongo atlas.

## Installation / build

Add .env file with MONGODB_URI and PORT env variables.
For example:

```sh
MONGODB_URI=mongodb://root:secret@127.0.0.1:27017/test
PORT=3002
```

Build and run dev. setup:
```sh
cd backend
npm run build:ui
docker compose up -d
npm run dev
```
