function Slider(opts) {
  this.slider = opts.slider // 获取应用Slider的DOM容器
  this.slider.style.height = opts.height || '100%'
  this.slider.style.backgroundColor = opts.backgroundColor || '#333'
  this.init()
  this.bindEvent()
}

Slider.prototype.init = function () {
  this.items = this.slider.querySelectorAll('.slider-item')

  // 如果 slider 元素内有 img 标签，需要判断元素的高宽比是否大于容器的高宽比
  // 根据高宽比来决定图片是高度充满容器还是宽度充满容器
  let imgs = this.slider.querySelectorAll('img')
  if (imgs.length > 0) {
    let ratio = this.slider.getBoundingClientRect().height / this.slider.getBoundingClientRect().width
    for (let i = 0; i < imgs.length; i++) {
      let imgRatio = imgs[i].naturalHeight / imgs[i].naturalWidth
      if (imgRatio > ratio) {
        imgs[i].style.height = '100%'
        imgs[i].style.width = 'auto'
      } else {
        imgs[i].style.width = '100%'
        imgs[i].style.height = 'auto'
      }
    }
  }

  // 将所有slider元素按顺序放置到相应位置
  // 并设置元素的尺寸与样式
  for (let i = 0; i < this.items.length; i++) {
    this.items[i].style.display = 'flex'
    this.items[i].style.justifyContent = 'center'
    this.items[i].style.alignItems = 'center'
    this.items[i].style.width = '100%'
    this.items[i].style.height = this.slider.getBoundingClientRect().height + 'px'
    this.items[i].style.position = 'absolute'
    this.items[i].style.transform = `translate3d(${i*window.innerWidth}px, 0, 0)`
  }
}

Slider.prototype.bindEvent = function () {
  let self = this
  self.idx = 0 // 保存当前显示元素索引

  self.slider.addEventListener('touchstart', function (e) {
    self.pageStart = e.targetTouches[0].pageX // 获取开始触摸的位置
  })

  self.slider.addEventListener('touchmove', function (e) {
    e.preventDefault()
    self.pageX = e.targetTouches[0].pageX // 获取移动到的位置
    // 获取手指在屏幕滑动的距离
    // 正值表示向右滑动，负值表示向左滑动
    self.offsetX = self.pageX - self.pageStart 
    
    // 滑动的同时更新当前元素以前前一个和后一个元素的位置
    let preIdx = self.idx === 0 ? 0 : (self.idx - 1)
    let nextIdx = self.idx === self.items.length - 1 ? self.items.length - 1 : (self.idx + 1)
    for (let i = preIdx; i <= nextIdx; i++) {
      self.items[i].style.transition = 'none'
      self.items[i].style.transform = `translate3d(${(i-self.idx)*window.innerWidth+self.offsetX}px, 0, 0)`
    }
  })

  // 手指离开时根据滑动距离是否大于二分之一的屏幕宽决定留在当前页还是跳到下一页或上一页
  self.slider.addEventListener('touchend', function (e) {
    if (self.offsetX > window.innerWidth / 2) {
      self.goIndex(-1)
    } else if (self.offsetX < 0 && self.offsetX < -(window.innerWidth / 2)) {
      self.goIndex(1)
    } else {
      self.goIndex(0)
    }
  })
}

Slider.prototype.goIndex = function (n) {
  // 目标索引表示要跳转到的元素的索引
  let targetIdx = this.idx + n
  if (targetIdx < 0) {
    targetIdx = 0
  } else if (targetIdx > this.items.length - 1) {
    targetIdx = this.items.length - 1
  }
  this.idx = targetIdx

  this.items[targetIdx].style.transition = `transform .2s ease-out`
  this.items[targetIdx-1] && (this.items[targetIdx-1].style.transition = `transform .2s ease-out`)
  this.items[targetIdx+1] && (this.items[targetIdx+1].style.transition = `transform .2s ease-out`)

  // 设置目标索引元素的位置
  this.items[targetIdx].style.transform = `translate3d(0, 0, 0)`
  this.items[targetIdx-1] && (this.items[targetIdx-1].style.transform = `translate3d(${-window.innerWidth}px, 0, 0)`)
  this.items[targetIdx+1] && (this.items[targetIdx+1].style.transform = `translate3d(${window.innerWidth}px, 0, 0)`)
}
