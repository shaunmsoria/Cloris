const config = require("../settings/config.json");
const path = require("path");
const fs = require("fs");

const base = process.cwd();
const metaPath = path.join(base,"/build/json");



const main = async () => {
    for ( let i = 1; i <= config.imageCount; i++){
        let data = '';
        let name = `picture${i}.json`;
        await fs.readFile(`${metaPath}/${name}`, 'utf8', (err, dataFile) => {
            if (err){
                console.log(err);
            } else {
                data = JSON.parse(dataFile);
                data.image = `${config.imageLocation}/${name}`;
                data.date = Date.now();
                for( let j = 0; j < config.layers.length; j++){
                    console.log(`The value of data.attributes[j] is ${data.attributes[j]}`);
                    let noDot = data.attributes[j].value.slice(0,data.attributes[j].value.indexOf('.'));
                    let capitalise = noDot.charAt(0).toUpperCase() + noDot.slice(1);
                    let spaceNb = (capitalise.search(/[0-9]/g) == -1 ) ? capitalise : capitalise.slice(0, capitalise.search(/[0-9]/g)) + " " + capitalise.slice(capitalise.search(/[0-9]/g));
                    data.attributes[j].value = spaceNb;
                };
                fs.writeFileSync(`${metaPath}/${name}`,JSON.stringify(data, null, 2));
                console.log(`value of data.image is ${data.image} and data.date is ${data.date}`);
            }
        });
    };
};


main ();