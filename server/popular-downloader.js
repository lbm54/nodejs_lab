let path = require("path");
let fs = require("fs");
let rp = require('request-promise');
let request = require('request');

let options = {
    uri: "https://reddit.com/r/popular.json",
    json: true
}

rp(options)
.then((result) => {
    result.data.children.forEach((child) => {
        if (child.data.is_video) {
            let url = child.data.media.reddit_video.fallback_url;
            let videoName = url.split('/').pop();
           request(url)
           .pipe(fs.createWriteStream(path.join(__dirname, `../downloads/${videoName}`)));
        }
    })
    // fs.writeFile(path.join(__dirname, "what.json"), JSON.stringify(result));
});