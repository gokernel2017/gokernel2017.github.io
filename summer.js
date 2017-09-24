//-----------------------------------------------
// Summer OBJECT Web Implementation:
//
//
//-----------------------------------------------
//
// onmouseover, onmouseout
//
var id=' ';
var idCount=0;
var isTouch=false;

var offset = [0, 0];
var isDown = false;

var mx, my; // mouse_x, mouse_y
var main_widget;

function so_Init() {
  isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  if (document.getElementsByTagName("body").length==0 || document.getElementsByTagName("link").length==0) {
    alert ("INIT ERRO: tag: <body> or tag: <link rel='stylesheet' href='garden.css' /> not found");
    return 0;
  }
  
  if (isTouch==false) {
    // desktop event: no mobile
    document.onmousemove = function(event) {
      //-------------------------------------------
      // isDown == true
      // on click in the window title bar.
      //-------------------------------------------
      if (isDown) {
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        mx = event.clientX;
        my = event.clientY;
        main_widget.style.left = (event.clientX + offset[0]) + 'px';
        main_widget.style.top  = (event.clientY + offset[1]) + 'px';
      }//: if (isDown)
    }//: document.onmousemove = function(event)
  }//: if (isTouch==false)

  return 1;
}

function so_NewWindow(x,y,w,h,txt) {
  var _x_, _y_, _w_, _h_; // to restore saved window size

  var o=document.createElement("widget");
  var b=document.createElement("titlebar");

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

  if (isTouch) {
    // buttons on title bar: Minimize, MAXIMIZE
    //
    var bmin=document.createElement("wb_min");
    var bmax=document.createElement("wb_max");
    b.appendChild(bmin);
    b.appendChild(bmax);
  } else {
    // tootip:
    var tt1=document.createElement("tooltip");
    var tt_text1=document.createElement("tooltiptext");
    tt_text1.innerHTML = "MAXIMIZE";

    var tt2=document.createElement("tooltip");
    var tt_text2=document.createElement("tooltiptext");
    tt_text2.innerHTML = "Minimize";

    tt1.style.right = 5+'px';
    tt1.style.top = 5+'px';

    tt2.style.right = 25+'px';
    tt2.style.top = 5+'px';
    tt_text2.style.left = -105+'px';
    tt_text2.style.top = -5+'px';

    tt_text1.style.left = -105+'px';
    tt_text1.style.top = -5+'px';

    tt2.onclick = function() {
      // restore:
      o.style.left = _x_;
      o.style.top = _y_;
      o.style.width = _w_;
      o.style.height = _h_;
    }

    tt1.onclick = function() {
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
    tt1.appendChild(tt_text1);
    b.appendChild(tt1);

    tt2.appendChild(tt_text2);
    b.appendChild(tt2);
  }

  o.appendChild(b); // add title
  document.body.appendChild(o); // add here

  return o;
}

function so_NewButton (parent, call, x, y, w, h, id, flags, data_text) {
/*
C Implementation:

extern OBJECT so_NewButton (
    OBJECT  parent,
    void (*call) (EVENT *event),
    int x, int y, int w, int h,
    int id,
    int flags,
    //---------- data ----------
    char  *text,
    );
*/

  var o=document.createElement("button");

  o.innerHTML = data_text; // button text

  o.onclick = call;

  o.style.position = "absolute";
  o.style.left = x+'px';
  o.style.top = y+'px';
  o.style.width = w+'px';
  o.style.height = h+'px';

  parent.appendChild(o); // add element on parent

  return o;
}
