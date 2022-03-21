const config = require("../settings/config.json");
const rarity = require("../settings/rarity.json");
const path = require("path");
const { random, round }= require("mathjs");
const canva = require("canvas");
const fs = require("fs");

const base = process.cwd();
const imagePath = path.join(base,"/images");

// ### Generate a random integer to define which attribute will be used
function randAttribute(_array){
    let randRange = 0;
    for ( let i = 0; i < _array.length; i++){
        randRange += _array[i].weight;
    };
    let value = round(random(randRange));
    // console.log(`The value of "value" is: ${value}`);
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

// ### create the metaData for each picture
function metaPic(){
    let dataObj = ``;
    for (let i =0; i < rarity.layers.length; i++){
        let randAttrValue = randAttribute(rarity.layers[i].attributes);
        // console.log(`metaPic attributes[0]: ${JSON.stringify(rarity.layers[i].name)}`);
        // console.log(`randAttrValue is: ${randAttrValue}`);
        dataObj += `${JSON.stringify(rarity.layers[i].name)}:${JSON.stringify(rarity.layers[i].attributes[randAttrValue].name)}${(i == rarity.layers.length - 1) ? "" : ","}`;
    };
    // console.log(`dataObj: ${dataObj}`);
    // console.log(`return: ${`{${dataObj}}`}`);
    return JSON.parse(`{${dataObj}}`);
};

function createImg(objImg){
    // console.log(`objImg name is ${objImg.name}`);
    // console.log(`objImg obj is ${objImg.layers}`);
    // console.log(`objImg length is ${Object.keys(objImg.layers).length}`);
    // const imgLength = Object.keys(objImg.layers).length;

    const arrayImg = Object.entries(objImg.layers);
    console.log(`arrayImg is ${arrayImg}`);
    for (let i = 0; i < arrayImg.length; i++){
        console.log(`objImg name is ${arrayImg[i][0]} and objImg layers ${arrayImg[i][1]}`);
    };
};



function create() {
    // ### generate x nb of images
    let metaData = [];
    fs.mkdir(imagePath, { recursive: true}, (err)=>{if (err){throw err}});

    for ( i = 0; i < config.imageCount ; i++){
        const picData = {};
        console.log(`index value ${i}`);
        picData.name = `picture${i+1}`; 
        picData.layers = metaPic();
        // console.log(`picData.name is: ${picData.name}`);        
        // console.log(`picData.layers: ${picData.layers}`);
        metaData.push(picData);
        console.log(`metaData${i}.name is: ${metaData[i].name} and metaData${i}.layers is: ${metaData[i].layers} `);
        createImg(metaData[i]);
    };  
    // console.log(`full metaData is: ${metaData}`);
    // console.log(`metaData 1 index: ${metaData[1]}`);
    // console.log(`metaData 1 name: ${metaData[1].name}`);
    // console.log(`metaData 1 layers: ${metaData[1].layers}`);
    // console.log(`metaData 1 layers.Backgrounds: ${metaData[1].layers.Backgrounds}`);
    
};

  
    

    // each image need to be randomly created from the 
    //      config and rarity JSONs
    //      ** image created from canva following the metadata
    // store each image in the project
    // store each image metadata in the project




const main = async() => {
    await create();
};

main ();