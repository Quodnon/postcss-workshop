'use strict';
const postcss = require("postcss");
const plugin = require("./plugin");
const fs = require("fs");
const css = fs.readFileSync('./style.css');


//execution
postcss().use(plugin)
    .process(css)
    .then( result=>
    {
        fs.writeFileSync("./style-before.css",result.css);
    }, console.error)