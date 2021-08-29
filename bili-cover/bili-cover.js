// ==UserScript==
// @name         bili cover
// @namespace    http://github.com/
// @version      0.1
// @description  将视频右侧的广告替换为视频封面
// @author       H4M5TER
// @match        *://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

'use strict'

try {
  const getRect = el => {
    let offsetLeft = 0, offsetTop = 0, offsetWidth = el ? el.offsetWidth : 0
    while (el && el.tagName !== 'body') {
      offsetLeft += el.offsetLeft
      offsetTop += el.offsetTop
      el = el.offsetParent
    }
    return {
      offsetWidth: `${offsetWidth}px`,
      offsetLeft: `${offsetLeft}px`,
      offsetTop: `${offsetTop}px`
    }
  }

  let slide_ad = document.getElementById('slide_ad')
  let vcd = document.getElementsByClassName('vcd')[0]
  let offsetLeft, offsetTop, offsetWidth //, offsetHeight
  if (slide_ad && slide_ad.offsetParent) {
    ({ offsetLeft, offsetTop, offsetWidth } = getRect(slide_ad))
  }
  else if (vcd && vcd.offsetParent) {
    ({ offsetLeft, offsetTop, offsetWidth } = getRect(vcd))
  }
  else {
    console.log('获取广告位置失败，脚本无法工作', slide_ad, vcd)
  }
  let cover = document.createElement('div')
  cover.id = 'bili-cover'
  cover.style = 'position: absolute; width: 320px; height: auto; border-radius: 2px;'
  if (offsetWidth) {
    cover.style.width = offsetWidth
  }
  cover.style.left = offsetLeft
  cover.style.top = offsetTop
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
    // 同步位置 否则会挡住弹幕列表、接下来播放和推荐视频
    cover.style.left = `${slide_ad.offsetLeft}px`
    cover.style.top = `${slide_ad.offsetTop}px`
    // 干掉没开广告屏蔽就会一直出的 vcd
    let vcd = document.getElementsByClassName('vcd')[0]
    if (vcd) {
      vcd.parentNode.innerHTML = ''
    }
    requestAnimationFrame(sync)
  })
} catch (e) {
  console.log(e)
}
