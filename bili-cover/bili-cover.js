// ==UserScript==
// @name         bili cover
// @namespace    http://github.com/
// @version      0.1.1
// @description  将视频右侧的广告替换为视频封面
// @author       H4M5TER
// @match        *://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

'use strict'

try {
  let vcd = document.getElementsByClassName('vcd')[0]
  let cover = document.createElement('div')
  cover.id = 'bili-cover'
  cover.appendChild((() => {
    let img = document.createElement('img')
    img.style = 'height: auto; width: 100%; display: block;'
    let src = [...document.head.getElementsByTagName('meta')].find(ele => ele.getAttribute('itemprop') === 'image').content
    // if (!src) {
    // // 如果meta里找不到封面 fallback到手动fetch
    //   src = fetch() 
    // }
    img.src = src
    let box = document.createElement('a')
    box.href = src
    box.appendChild(img)
    return box
  })())
  let anchor = vcd.parentNode
  let observer = new MutationObserver((mutationList, observer) => {
    console.log('update')
    for (let { target, addedNodes, removedNodes } of mutationList) {
      console.log('add:')
      for (let node of addedNodes) {
        console.log(node.getAttribute('class'))
        console.log(node.getAttribute('id'))
        if (node.getAttribute('class') === 'vcd')
          target.removeChild(node)
      }
      console.log('del:')
      for (let node of removedNodes) {
        console.log(node.getAttribute('class'))
        console.log(node.getAttribute('id'))
        if (node.getAttribute('id') === 'bili-cover')
          target.appendChild(cover)
      }
    }
  })
  observer.observe(anchor, { childList: true })
  // observe 被下面两行触发之后失效了 怀疑是 b 站的魔法
  anchor.innerHTML = ''
  anchor.appendChild(cover)
} catch (e) {
  console.log(e)
}
