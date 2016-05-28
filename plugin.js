"use strict"

const postcss = require("postcss")
const name = "postcss-short-supports"
// const {name} = require("./package")

module.exports = postcss.plugin(name, options => css =>
{
    let {except = /.^/} = options || {}

    css.walkDecls("background-attachment", decl =>
    {
        if (decl.value != "fixed") return

        let {parent} = decl
        let {selector} = parent

        if (except.test(selector)) return

        parent.append
        (
            "isolation: isolate",
            "overflow: hidden",
            "background: none"
        )

        css.append(`${selector}::before
        {
            content: "";
            position: fixed;
            z-index: -1;
            will-change: transform;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-image: inherit;
            background-size: inherit;
        }`)

        decl.remove()
    })
})
