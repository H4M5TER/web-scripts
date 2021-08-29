# B 站广告改封面

<details>
<summary> 废话 </summary>
用别人的插件出了点问题，代码还有点屎，不好看又不好改，遂重写之。
重写完才发现是因为用的浏览器自带了广告屏蔽，但是我一开始没发现。
为什么呢，因为这个广告屏蔽比较垃圾，仅仅是用全局的 css !important 实现的，干掉了 slide_ad 没干掉 vcd。
其实并没有多优化很多东西，只能说至少代码好看了，并且统一使用 vcd 进行初始化。
封面 div 直接放在 r_con 里的话会被覆盖，目前还是放在外面然后用手段同步位置。
但是广告屏蔽下 slide_ad 已经死掉了，vcd 干掉两次就不刷新了，没法跟随改变位置。
考虑不干掉 vcd，无须额外操作可以解决，考虑跟随 reco_list ，可以解决。
问题在于 slide_ad 死掉的情况下，找不到方法来填充封面需要的额外高度，一定会盖掉一部分推荐视频。
考虑用更小范围的 !important 覆盖 (style = 'display: block !important;')，还是死的。新建一个 div 插入到 slide_ad 位置，排版没有变化。
新建一个 div 伪装成 slide_ad 替换原来的，并且使用 requestAnimationFrame 更新，排版没有变化。
考虑修改 reco_list 起始高度 (style.offsetTop)，并且使用 requestAnimationFrame 更新，排版没有变化。
没兼容番剧界面，话说回来番剧有封面这种东西吗。
没有在 meta 取不到封面的情况下 fallback 到 fetch。
没有实现不知道有什么用的 injectCSS，看起来就是把 close-btn 置到最顶层，不知道有什么用。
</details>
