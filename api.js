const express = require("express");
const app = express();
const stream = require('stream');
const ytdl = require('ytdl-core')
const fs = require('fs');
const yts = require('yt-search')
var cors = require('cors');
var compression = require('compression')


app.use(cors());
app.use(compression())

app.listen(4000, () => {
 console.log("Server running on port 4000");
});

app.get("/download", (req, res) => {
    var videoId=req.query.videoId;
    var type=req.query.type;
    var title=req.query.title;
    var url = "https://www.youtube.com/watch?v=" + videoId
    var filename=(type == 'video')?title + '.mp4':title+ '.mp3'
    var dl=(type == 'video') ? ytdl(url, {filter: format => format.container === 'mp4'}):ytdl(url,{ filter:'audioonly'})
    res.attachment(filename)
    var pass = new stream.PassThrough();
    dl.pipe(pass).pipe(res)
});


app.get("/search", (req, res) => {
    var results=[]
    var query=req.query.query
    yts( query, function ( err, r ) {
        if ( err ){
           console.log(err)
        }
         const videos = r.videos
         videos.forEach( function ( v ) {
           var result={
               "id": v.videoId,
               "thumb": v.thumbnail,
               "title": v.title
           }
           results.push(result)
         })
         res.json(results)
    });
});

app.get("/healthcheck", (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send("OK")
});