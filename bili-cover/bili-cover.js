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
  const getRect = el => {
    let offsetLeft = 0, offsetTop = 0, offsetWidth = el ? el.offsetWidth : 320
    while (el && el.tagName !== 'body') {
      offsetLeft += el.offsetLeft
      offsetTop += el.offsetTop
      el = el.offsetParent
    }
    return {
      offsetWidth: offsetWidth,
      offsetLeft: offsetLeft,
      offsetTop: offsetTop
    }
  }

  let slide_ad = document.getElementById('slide_ad')
  let vcd = document.getElementsByClassName('vcd')[0]
  let vcdRect
  if (vcd)
    vcdRect = getRect(vcd)
  else
    console.log('定位失败，脚本无法正常工作')
  let cover = document.createElement('div')
  cover.id = 'bili-cover'
  cover.style = 'position: absolute; height: auto; border-radius: 2px;'
  cover.style.width = `${vcdRect.offsetWidth}px`
  cover.style.left = `${vcdRect.offsetLeft}px`
  cover.style.top = `${vcdRect.offsetTop}px`
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
  document.body.appendChild(cover)
  requestAnimationFrame(() => {
    cover = document.getElementById('bili-cover')
    slide_ad.style.height = `${cover.offsetHeight}px`
  })
  requestAnimationFrame(function sync() {
    vcd = document.getElementsByClassName('vcd')[0]
    if (slide_ad?.offsetParent) {
      cover.style.top = `${getRect(slide_ad).offsetTop}px`
      if (vcd)
        vcd.parentNode.innerHTML = ''
    }
    else if (vcd) {
      cover.style.top = `${getRect(vcd).offsetTop}px`
    }
    requestAnimationFrame(sync)
  })
} catch (e) {
  console.log(e)
}
