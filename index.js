'use strict';
const postcss = require("postcss");
const plugin = require("./plugin")

//test string
const css =
`
body
{
    color:red;
}
`


//execution
postcss().use(plugin)
    .process(css)
    .then( result=>
    {
        console.log(result.css)
    })