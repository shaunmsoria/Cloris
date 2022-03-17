const config = require("../settings/config.json");
const rarity = require("../settings/rarity.json");
const path = require("path");
const canva = require("canvas");
const fs = require("fs");


function create() {
    // generate x nb of images
    metaData = {};


    for ( i = 0; i < config.layers.length; i++){
        metaData.name = i;
        metaData.layers = config.layers.map((item, index)=>{
            item = { name: config.layers[index]  };
        });
    }

    console.log(`The metaData.name is:`, metaData.name);
    console.log(`The metaData.layers is:`, metaData.layers);
    


    // each image need to be randomly created from the 
    //      config and rarity JSONs
    //      ** image created from canva following the metadata
    // store each image in the project
    // store each image metadata in the project

};


const main = async() => {
    await create();
};

main ();