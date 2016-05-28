'use strict';
const postcss = require("postcss");
const plugin = require("./plugin");
const fs = require("fs");

//test string
const css =
`body
{
    margin: 0;
    font-size: 200px;
    color: #fff;
}

section
{
    height: 100vh;
    background-attachment: fixed;
}

`


//execution
postcss().use(plugin)
    .process(css)
    .then( result=>
    {
        fs.writeFileSync("./style-before.css",result.css);
        console.log(result.css)
    }, console.error)