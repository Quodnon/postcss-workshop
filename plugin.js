"use strict";

const postcss = require("postcss");

module.exports =postcss.plugin("postcss-short-supports",()=>css=>{
    css.walkDecls("background-attachment", decl =>
    {
        if (decl.value !='fixed') return
        
        let {parent} = decl
        
        let hasPosition = parent.some(node=>
        {
            if (node.type !='decl') return
            if (node.prop !='position') return
            if (node.value =='static') return true
        })
        
        if (!hasPosition)
        {
            let decl = postcss.decl({ prop: "position", value:"relative"})
            parent.append(decl)
        }
    })
});