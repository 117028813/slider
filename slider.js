class Slider {
  constructor(options) {
    let defaultOptions = {
      element: '',
      height: '100%',
      backgroundColor: '#333'
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.options.element.style.height = this.options.height
    this.options.element.style.backgroundColor = this.options.backgroundColor
    this.init().bindEvent()
  }

  init() {
    this.items = this.options.element.querySelectorAll('.slider-item')

    // 如果 slider 元素内有 img 标签，需要判断元素的高宽比是否大于容器的高宽比
    // 根据高宽比来决定图片是高度充满容器还是宽度充满容器
    let imgs = this.options.element.querySelectorAll('img')
    if (imgs.length > 0) {
      let ratio = this.options.element.getBoundingClientRect().height / this.options.element.getBoundingClientRect().width
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
      this.items[i].style.height = this.options.element.getBoundingClientRect().height + 'px'
      this.items[i].style.position = 'absolute'
      this.items[i].style.transform = `translate3d(${i*window.innerWidth}px, 0, 0)`
    }

    return this
  }

  bindEvent() {
    let self = this
    self.idx = 0 // 保存当前显示元素索引

    self.options.element.addEventListener('touchstart', function (e) {
      self.pageStart = e.targetTouches[0].pageX // 获取开始触摸的位置
      self.touchStart = new Date() * 1 // 记录手指按下的时间戳
      // 当触摸没有滑动的时候将滑动距离重置为0
      self.offsetX = 0
    })

    self.options.element.addEventListener('touchmove', function (e) {
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
    self.options.element.addEventListener('touchend', function (e) {
      self.touchEnd = new Date() * 1 // 记录手指离开的时间戳
      // 手指滑动时间超过300ms后，需要滑动一般屏幕宽度才会切换到下一页
      // 手指滑动时间不到300ms,只要滑动距离超过50px就会切换到下一页
      if (self.touchEnd - self.touchStart > 300) {
        if (self.offsetX > window.innerWidth / 2) {
          self.goIndex(-1)
        } else if (self.offsetX < 0 && self.offsetX < -(window.innerWidth / 2)) {
          self.goIndex(1)
        } else {
          self.goIndex(0)
        }
      } else {
        if (self.offsetX > 50) {
          self.goIndex(-1)
        } else if (self.offsetX < -50) {
          self.goIndex(1)
        } else {
          self.goIndex(0)
        }
      }
    })

    return this
  }

  goIndex(n) {
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
}
