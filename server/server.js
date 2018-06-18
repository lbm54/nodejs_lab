let path = require("path");
let fs = require("fs");
let rp = require('request-promise');

let chirps = [
  {
    handle: "Lee",
    text: "text"
  },
  {
    handle: "Lee",
    text: "text"
  },
  {
    handle: "Lee",
    text: "text"
  },
  {
    handle: "Lee",
    text: "text"
  },
  {
    handle: "Lee",
    text: "text"
  }
];

fs.writeFile(path.join(__dirname, "../chirps.json"), JSON.stringify(chirps), err => {
  if (err) console.log(err);
});

fs.readFile(
  path.join(__dirname, "../chirps.json"),
  {
    encoding: "UTF8"
  },
  (err, data) => {
    if (err) console.log(err);
    console.log(JSON.parse(data));
  }
);

var options = {
  uri: "https://reddit.com/r/popular.json",
  json: true
}

rp(options)
.then((result) => {
  result.data.children.forEach(entry => {
    console.log(`Title:\t${entry.data.title}\nUrl:\t${entry.data.url}\nAuthor:\t${entry.data.author}\n`);
    fs.appendFileSync(path.join(__dirname, "../popular-articles.json"), JSON.stringify(entry), err => {
      if (err) console.log(err);
    });
  })
}).catch((err) => {
  console.log(err);
})

