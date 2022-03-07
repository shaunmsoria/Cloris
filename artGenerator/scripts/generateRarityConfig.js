const config = require("../settings/config.json");
const path = require("path");
const fs = require("fs");

const base = process.cwd();
const layersBasePath = path.join(base, "/layers");