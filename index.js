'use strict';
const postcss = require("postcss");
const plugin = require("./plugin")

//test string
const css =
`
@supports filter:{
    body
    {
        filter : blur(10px);
    }
}
`


//execution
postcss().use(plugin)
    .process(css)
    .then( result=>
    {
        console.log(result.css)
    })