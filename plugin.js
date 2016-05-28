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
        
        if (!hasPosition){
            let decl = postcss.decl({ prop: "position", value:"relative"})
            parent.append(decl)
        }
        
        let zIndex = parent.some(node=>{
            return node.type=="decl" && node.prop=='z-index'
        })
        
        if(!zIndex){
            parent.append({ prop:"z-index", value:0 })
        }
        
        let overflow = parent.nodes.find(node=>
        {
            return node.type =='decl'
                && node.prop =='overflow'
        })
        
        if (overflow) overflow.value ='hidden'
        else parent.append({prop:'overflow',value:'hidden'})
        
        parent.append({prop:"background-size", value:"0 0"})
        decl.remove()
        
        let selector =`${parent.selector}::before`
        
        css.append(
            `
                ${selector}
                {
                    content:"";
                    position: fixed;
                    z-index: -1;
                    will-change: transform;
                    
                    top:0; left:0;
                    width:100%; height: 100%;
                    background-image:inherit;
                }
            `)
    })
});