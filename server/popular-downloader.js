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
            console.log(child.data.media.reddit_video.dash_url);
           request(child.data.media.reddit_video.dash_url)
           .pipe(fs.createWriteStream(path.join(__dirname, `../downloads/${child.data.title}`)));
        }
    })
    // fs.writeFile(path.join(__dirname, "what.json"), JSON.stringify(result));
});