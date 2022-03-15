const config = require("../settings/config.json");
const path = require("path");
const fs = require("fs");

const base = process.cwd();
const layersBasePath = path.join(base, "/layers");

function layerName (_layerPath) {
    // Format each elements of _layerPath array with the following structure:
    return _layerPath
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map(item => `{"name": "${item.toLowerCase()}", "weight": 10}`);
};

function generateRarityConfig() {
    let layerConstruct =``;

    // Construct each layer individually
    for (let i = 0; i < config.layers.length; i++) {
        
        let content = layerName (fs.readdirSync(`${layersBasePath}/${config.layers[i]}`));
        let layerTemp = `{"name": "${config.layers[i]}", "attributes": [${content}]}${(i == config.layers.length - 1) ? "" : ", "}`;
        
        layerConstruct = layerConstruct.concat(layerTemp);
    };

    // Regroup all layers into 1 string
    const layers = `{"layers": [${layerConstruct}]}`;
    // format the string with parse and stringify it with a proper JSON formart
    const layersFormat = JSON.stringify(JSON.parse(layers),null, 2);

    // write the content in the rarity.json file
    fs.writeFile(`${base}/settings/rarity.json`,`${layersFormat}`, (err)=>{console.log(err)});
};

const main = async () => {
    const result = await generateRarityConfig();
};

main ();