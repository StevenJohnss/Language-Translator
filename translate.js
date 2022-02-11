
const fs = require('fs');
const path = require('path')

var api = "your_google_cloud_translate_api_key_here";
var googleTranslate = require('google-translate')(api);

//only files with .json exstention will be checkd
const jsonsInDir = fs.readdirSync('./').filter(file => path.extname(file) === '.json');
count = 1;
jsonsInDir.forEach((file, i) => {
  if (file && file !== "list.json" && file !== "package-lock.json" && file !== "package.json") {
    const fileData = fs.readFileSync(path.join('./', file));
    const json = JSON.parse(fileData.toString());
    let text = 'View incident' // our text to translate here

    googleTranslate.translate(text, json.languageCode, function (err, translation) {
      try {
        console.log("NO: " + count + " " + json.languageCode + " :>", translation.translatedText);
        json.viewincident = translation.translatedText
        count++ //to check that the all 24 languages has been updated
        fs.writeFile(file, JSON.stringify(json), 'utf8', function (err) {
          if (err) throw err;
          console.log('complete viewMaintenance');
        });
      } catch (error) {
        console.log("error in " + file)
        console.log(error);
      }
    });
  } else {
    console.log("This " + file + " isn't a lang file");
  }
});

