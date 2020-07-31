const express = require("express");
const app = express();
const stream = require('stream');
const ytdl = require('ytdl-core')
const fs = require('fs');


app.listen(4000, () => {
 console.log("Server running on port 4000");
});

app.get("/download", (req, res, next) => {

    var videoId=req.query.videoId;
    var type=req.query.type;
    var title=req.query.title;

    var dl=(type == 'video') ? ytdl(url, {filter: format => format.container === 'mp4'}):ytdl(url,{ filter:'audioonly'})
    var wstream=fs.createWriteStream('./files/'+ title + '.mp4')
    dl.pipe(wstream)

    wstream.on('finish', () => {
        console.log('All writes are now complete.');
        res.download('/files/' + title + '.mp4');
    });
});