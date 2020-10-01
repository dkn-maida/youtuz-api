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

// app.get("/downloadSize", (req, res) => {
//     var videoId=req.query.videoId;
//     //var type=req.query.type;
//     var url = "https://www.youtube.com/watch?v=" + videoId
//     ytdl.getInfo(url)
//     .then(infos => {
//         let format=ytdl.chooseFormat(infos.formats, {filter: format => format.container === 'mp4'})
//         console.log(format)
//         res.send(format.contentLength)
//     })
//     .catch(err => console.log(err));
// });

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