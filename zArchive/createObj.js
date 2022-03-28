const config = require("../artGenerator/settings/config.json");
const rarity = require("../artGenerator/settings/rarity.json");
const path = require("path");
const { random, round }= require("mathjs");
const canva = require("canvas");
const fs = require("fs");
// const dispose = require("buffer-dispose");

const base = process.cwd();
const layerPath = path.join(base,"/layers");
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
// function metaPic(){  //  c2
//     let dataObj = ``;
//     for (let i =0; i < rarity.layers.length; i++){
//         let randAttrValue = randAttribute(rarity.layers[i].attributes);
//         // console.log(`metaPic attributes[0]: ${JSON.stringify(rarity.layers[i].name)}`);
//         // console.log(`randAttrValue is: ${randAttrValue}`);
//         dataObj += `${JSON.stringify(rarity.layers[i].name)}:${JSON.stringify(rarity.layers[i].attributes[randAttrValue].name)}${(i == rarity.layers.length - 1) ? "" : ","}`;
//     };
//     return JSON.parse(`{${dataObj}}`);
// };

function metaPic(){  
    let dataArr = [];
    for (let i =0; i < rarity.layers.length; i++){
        let randAttrValue = randAttribute(rarity.layers[i].attributes);
        // console.log(`metaPic attributes[0]: ${JSON.stringify(rarity.layers[i].name)}`);
        // console.log(`randAttrValue is: ${randAttrValue}`);
        console.log(`rand attribute is: ${rarity.layers[i].attributes[randAttrValue].name}`)
        dataArr.push(rarity.layers[i].attributes[randAttrValue].name);
        // dataArr += `${JSON.stringify(rarity.layers[i].name)}:${JSON.stringify(rarity.layers[i].attributes[randAttrValue].name)}${(i == rarity.layers.length - 1) ? "" : ","}`;
    };
    return dataArr;
};

function createImg(objImg){
    console.log(`objImg[0].name is: ${objImg[0].name} and objImg[0].layers.Background is: ${objImg[0].layers[0]}`);
    
    for (let obj = 0; obj < objImg.length; obj++){
        // const arrayImg = Object.entries(objImg[obj].layers); //  c2
        // console.log(`arrayImg is ${arrayImg}`);

        const width = config.imageDetails.width;
        const height = config.imageDetails.height;
        const canvas = canva.createCanvas(width, height);
        const context = canvas.getContext(`2d`);
        const arrayLayers = config.layers;
        const arrayAttPic = objImg[obj].layers;


        // for (let i = 0; i < arrayImg.length ; i++){          //  c2   
        //     console.log(`objImg name is ${arrayImg[i][0]} and objImg layers ${arrayImg[i][1]}`);
        //     canva.loadImage(path.join(layerPath, `/${arrayImg[i][0]}/${arrayImg[i][1]}`)).then(image => {
        //         context.drawImage(image,0,0,width,height);
        //         const buffer = canvas.toBuffer("image/png");
        //         fs.writeFileSync(`${imagePath}/${objImg[obj].name}.png`, buffer);
                
        //     });
        // };

        for (let i = 0; i < arrayLayers.length ; i++){          //  c2   
            console.log(`arrayLayers name is ${arrayLayers[i]} and arrayAttPic ${arrayAttPic[i]}`);
            canva.loadImage(path.join(layerPath, `/${arrayLayers[i]}/${arrayAttPic[i]}`)).then(image => {
                context.drawImage(image,0,0,width,height);
                const buffer = canvas.toBuffer("image/png");
                fs.writeFileSync(`${imagePath}/${objImg[obj].name}.png`, buffer);
                
            });
        };
        
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
        // console.log(`metaData${i}.name is: ${metaData[i].name} and metaData${i}.layers is: ${metaData[i].layers.Backgrounds} `); //  c2
        console.log(`metaData${i}.name is: ${metaData[i].name} and metaData${i}.layers is: ${metaData[i].layers} `);
    }; 
    // createImg(metaData[i]); 
    createImg(metaData);
    // console.log(`metaData is: ${metaData}`);
    
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