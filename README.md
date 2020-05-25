# X-Plane 11 Historical Weather

I found that there was no proper way to load historical weather into X-Plane 11. However I found that https://mesonet.agron.iastate.edu/request/download.phtml will give you METAR files. They just needed some formatting to become the `.rwx` file that X-Plane accepts.

# The magic
There really isn't that much magic to it. The files from Iowa University are just not formatted perfectly.

We take the last column from there files (which is the raw METAR) and the second column which is the date. We re-format the date to match that of `.rwx` files. And we create the file like that, e.g.

```
2020/02/09 00:00
KDVN 090000Z AUTO 25004KT 10SM CLR M04/M08 A3019 RMK T10401080 MADISHF

2020/02/09 00:00
KOTM 090000Z AUTO 09005KT 10SM CLR M04/M08 A3012 RMK T10401080 MADISHF
```


# Deploy notes
## Running locally

Make sure you have the Angular CLI installed

```
$ sudo npm i -g @angular/cli
```

Install dependencies

```
$ npm i
```

Run
```
$ ng serve
```

It should run at `http://localhost:4200`.

## Building
Create a file in the project root called `docker-registry` which contains your registry base. (For Dockerhub this is just your username).

Set package version in `package.json`.

Build angular
```
$ ng build --prod
```

Build docker
```
$ npm run docker:build
```

Push docker
```
$ npm run docker:push
```