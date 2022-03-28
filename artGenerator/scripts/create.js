const config = require("../settings/config.json");
const rarity = require("../settings/rarity.json");
const path = require("path");
const { random, round }= require("mathjs");
const canva = require("canvas");
const fs = require("fs");

const base = process.cwd();
const layerPath = path.join(base,"/layers");
const imagePath = path.join(base,"/build/images");
const metaPath = path.join(base,"/build/json");

// ### Generate a random integer to define which attribute will be used
function randAttribute(_array){
    let randRange = 0;
    for ( let i = 0; i < _array.length; i++){
        randRange += _array[i].weight;
    };
    let value = round(random(randRange));
    let threshold = 0; 
    let index = 0;
    for ( let j = 0; j < _array.length; j++){
        if ( value >= threshold && value < threshold + _array[j].weight){
            return index;
        } else {
            index++;
            threshold += _array[j].weight;
        };
    };
    return index-1;
};

function randId(){
    const result = [];
    const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for( let i = 0; i < 40; i++){
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
}

async function createPic(picName){
    const width = config.imageDetails.width;
    const height = config.imageDetails.height;
    const canvas = canva.createCanvas(width, height);
    const context = canvas.getContext(`2d`);
    
    let dataArr = [];

    for (let i =0; i < rarity.layers.length; i++){
        let randAttrValue = randAttribute(rarity.layers[i].attributes);
        dataArr.push({trait_type: rarity.layers[i].name, value: rarity.layers[i].attributes[randAttrValue].name});
        console.log(`trait is ${dataArr[i].trait_type} and value is ${dataArr[i].value}`);
        await canva.loadImage(path.join(layerPath, `/${dataArr[i].trait_type}/${dataArr[i].value}`)).then(image => {
            context.drawImage(image,0,0,width,height);
            const buffer = canvas.toBuffer("image/png");
            fs.writeFileSync(`${imagePath}/${picName}.png`, buffer);
            console.log('Canva written in file'); 
        });
    };
    return dataArr;
}

// ### create each Pictures sequentially
async function createMeta(picName){
    let picFile = `${metaPath}/${picName}.json`;
    let resultPic = await createPic(picName);
    let content = {id:randId(),name:picName,description:"Cloris",image:"",edition:config.edition,date:Date.now(),attributes:resultPic};
    
    fs.writeFileSync(picFile,JSON.stringify(content, null, 2));

};

// ### create meta directory and save metaData
function saveMeta(_metaData){
    fs.mkdir(`${metaPath}`, {recursive: true}, (err)=> {(err) ? console.log(err) : console.log(`the directory ${metaPath} was successfully created`)});
    fs.writeFile(`${metaPath}/metaData.json`,JSON.stringify(_metaData, null, 2),(err)=>{(err) ? console.log(err) : console.log(`metaData.json successfully created`)});
}

// ### execute the picture creation protocol
async function create() {
    // ### generate x nb of images
    let metaData = [];
    fs.mkdir(imagePath, { recursive: true}, (err)=>{if (err){throw err}});
    fs.mkdir(metaPath, { recursive: true}, (err)=>{if (err){throw err}});

    for (let i = 0; i < config.imageCount ; i++){
        const picData = {};
        console.log(`index value ${i}`);
        picData.name = `picture${i+1}`; 
        picData.layers = await createMeta(picData.name);
    }; 

};


function main () {
    create();
};

main ();