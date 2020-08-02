const express = require("express");
const app = express();
const stream = require('stream');
const ytdl = require('ytdl-core')
const fs = require('fs');
var cors = require('cors');
var compression = require('compression')


app.use(cors());
app.use(compression())

app.listen(4000, () => {
 console.log("Server running on port 4000");
});

app.get("/download", (req, res, next) => {

    var videoId=req.query.videoId;
    var type=req.query.type;
    var title=req.query.title;
    var url = "https://www.youtube.com/watch?v=" + videoId

    console.log(url)

    var filename=(type == 'video')?title + '.mp4':title+ '.mp3'
    var dl=(type == 'video') ? ytdl(url, {filter: format => format.container === 'mp4'}):ytdl(url,{ filter:'audioonly',  dlChunkSize: '256KB'})
   
    res.attachment(filename)
    var pass = new stream.PassThrough();
    dl.pipe(pass).pipe(res)
});