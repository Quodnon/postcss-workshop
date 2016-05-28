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

body
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
        console.log(result.css)
    })