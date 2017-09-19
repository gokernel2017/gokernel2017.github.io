//-----------------------------------------------
//
// Summer OBJECT Web Implementation:
//
//-----------------------------------------------
//
// onmouseover, onmouseout
//
var id=' ';
var idCount=0;
var isTouch=false;

var offset = [0,0];
var isDown = false;

var mx, my; // mouse_x, mouse_y
var main_widget;

function so_Init () {
  isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  if (document.getElementsByTagName("body").length==0 || document.getElementsByTagName("link").length==0) {
    alert ("INIT ERRO: tag: <body> or tag: <link rel='stylesheet' href='garden.css' /> not found");
    return 0;
  }

  document.onmousemove = function(event) {
    //-------------------------------------------
    // isDown == true
    // on click in the window title bar.
    //-------------------------------------------
    if (isDown) {
      if (isTouch) { // mobile
        var t = event.changedTouches[0];
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        mx = t.clientX;
        my = t.clientY;
        main_widget.style.left = (t.clientX + offset[0]) + 'px';
        main_widget.style.top  = (t.clientY + offset[1]) + 'px';
      } else { // no mobile
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        mx = event.clientX;
        my = event.clientY;
        main_widget.style.left = (event.clientX + offset[0]) + 'px';
        main_widget.style.top  = (event.clientY + offset[1]) + 'px';
      }
    }//: if (isDown)
  }//: document.onmousemove = function(event)

  return 1;
}

function so_NewWindow(x,y,w,h,txt) {
  var _x_, _y_, _w_, _h_; // to restore saved window size

  var o=document.createElement("widget");
  var b=document.createElement("titlebar");

  var bmin=document.createElement("wb_min");
  var bmax=document.createElement("wb_max");

  o.setAttribute("id", "main_body");

  o.style.left = x+'px';
  o.style.top = y+'px';
  o.style.width = w+'px';
  o.style.height = h+'px';
  sizeW = h+'px';

  b.innerHTML = txt;

  // save:
  _x_ = o.style.left;
  _y_ = o.style.top;
  _w_ = o.style.width;
  _h_ = o.style.height;

/*
  mini.onclick = function() {
    // restore:
    o.style.left = _x_;
    o.style.top = _y_;
    o.style.width = _w_;
    o.style.height = _h_;
  }

  max.onclick = function() {
    var ww = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body'),
    xx = w.innerWidth || e.clientWidth || g.clientWidth,
    yy = w.innerHeight|| e.clientHeight|| g.clientHeight;

    o.style.left = 5+'px';
    o.style.top = 5+'px';
    o.style.width = xx-20+'px';
    o.style.height = yy-20+'px';
  }
*/

  if (isTouch) {
    //-------------------------------------------
    // MOBILE TOUCH EVENT:
    //-------------------------------------------
    //
    o.addEventListener('touchstart', function(event) {
      var t = event.changedTouches[0];

      if (t.clientY-this.offsetTop < 30) { // click in title bar

          isDown = true; //<<<<<<< enable here >>>>>>>

          offset = [
            this.offsetLeft - t.clientX,
            this.offsetTop  - t.clientY
          ];
      }
      var array = document.getElementsByTagName("widget");

      //
      // Envia para o TOPO O WIDGET ...
      //
      for (var i = 0; i < array.length; i++) {
          array[i].style.zIndex = 1;
      }
      this.style.zIndex = array.length;

  main_widget = this;

    }, true);

    o.addEventListener('touchend', function () { isDown = false; }, true);

/*
    o.addEventListener('touchmove', function(event) {
      var t = event.changedTouches[0];

      if (isDown && t.clientY < this.offsetTop+30) {
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        this.style.left = (t.clientX + offset[0]) + 'px';
        this.style.top  = (t.clientY + offset[1]) + 'px';
      }
    }, true);
*/
  } else {
    //-------------------------------------------
    // DESKTOP MOUSE EVENT:
    //-------------------------------------------
    //
    o.addEventListener('mousedown', function(event) {
      if (event.clientY-this.offsetTop < 30) {

          isDown = true; //<<<<<<<  enable here  >>>>>>>

          offset = [
            this.offsetLeft - event.clientX,
            this.offsetTop - event.clientY
          ];
      }
      var array = document.getElementsByTagName("widget");
      //
      // Envia para o TOPO O WIDGET ...
      //
      for (var i = 0; i < array.length; i++) {
          array[i].style.zIndex = 1;
      }
      this.style.zIndex = array.length;

  main_widget = this;

    }, true);

    o.addEventListener('mouseup', function() { isDown = false; }, true);

/*
    o.addEventListener('mousemove', function(event) {
      if (isDown) {// && event.clientY < this.offsetTop+30) {
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        this.style.left = (event.clientX + offset[0]) + 'px';
        this.style.top  = (event.clientY + offset[1]) + 'px';
      }
    }, true);
*/
  }

  b.appendChild(bmin);
  b.appendChild(bmax);

  o.appendChild(b); // add title
  document.body.appendChild(o); // add here

  return o;
}

function so_NewButton (x,y,w,h,txt,par,func) {
  var o=document.createElement("button");

  o.innerHTML = txt; // button text

  o.onclick = func;

  o.style.position = "absolute";
  o.style.left = x+'px';
  o.style.top = y+'px';
  o.style.width = w+'px';
  o.style.height = h+'px';

  par.appendChild(o); // add element on parent

  return o;
}
