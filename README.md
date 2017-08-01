## 使用方法

### 参数

`slider`: 必须，type: DOMObject，滑动元素的容器

`height`: 可选，type: String，容器的高度，默认是 100%

`backgroundColor`: 可选，type: String，容器的背景色，默认是 `#333`


example 1:

```html
<div class="slider1">
  <div class="slider-item" style="background:red;">1</div>
  <div class="slider-item" style="background:green;">2</div>
  <div class="slider-item" style="background:blue;">3</div>
</div>  
```

```js
new Slider({
  slider: document.querySelector('.slider1'),
  height: '150px'
})
```

example 2:

```html
<div class="slider2">
  <div class="slider-item" style="background:url('./imgs/1.jpg') center/contain no-repeat"></div>
  <div class="slider-item" style="background:url('./imgs/2.jpg') center/contain no-repeat"></div>
  <div class="slider-item" style="background:url('./imgs/3.jpg') center/contain no-repeat"></div>
</div>  
```

```js
new Slider({
  slider: document.querySelector('.slider2'),
  height: '150px'
})
```

example 3:

```html
<div class="slider3">
  <div class="slider-item"><img src="./imgs/1.jpg"></div>
  <div class="slider-item"><img src="./imgs/2.jpg"></div>
  <div class="slider-item"><img src="./imgs/3.jpg"></div>
  <div class="slider-item"><img src="./imgs/4.jpg"></div>
  <div class="slider-item"><img src="./imgs/5.jpg"></div>
  <div class="slider-item"><img src="./imgs/6.jpg"></div>
  <div class="slider-item"><img src="./imgs/7.jpg"></div>
  <div class="slider-item"><img src="./imgs/8.jpg"></div>
</div> 
```

```js
new Slider({
  slider: document.querySelector('.slider3'),
  height: '150px'
})
```