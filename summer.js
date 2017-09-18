//-----------------------------------------------
//
// Summer OBJECT Web Implementation:
//
//-----------------------------------------------
//
var id=' ';
var idCount=0;
var isTouch=false;

var offset = [0,0];
var isDown = false;


function so_Init () {
  isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  if (document.getElementsByTagName("body").length==0 || document.getElementsByTagName("link").length==0) {
    alert ("INIT ERRO: tag: <body> or tag: <link rel='stylesheet' href='garden.css' /> not found");
    return 0;
  }
  return 1;
}


function so_NewWindow(x,y,w,h,txt) {
  var o=document.createElement("widget");
  var b=document.createElement("titlebar");
  var c=document.createElement("btclose");

  o.style.left = x+'px';
  o.style.top = y+'px';
  o.style.width = w+'px';
  o.style.height = h+'px';

  b.innerHTML = txt;

  if (isTouch) {
    //-------------------------------------------
    // MOBILE TOUCH EVENT:
    //-------------------------------------------
    //
    o.addEventListener('touchstart', function(event) {
      var t = event.changedTouches[0];

      if (t.clientY-this.offsetTop < 30) {
          isDown = true;
          offset = [
            this.offsetLeft - t.clientX,
            this.offsetTop  - t.clientY
          ];
      }
//      var array = document.getElementsByTagName("widget");

      //
      // Envia para o TOPO O WIDGET ...
      //
//      for (var i = 0; i < array.length; i++) {
//          array[i].style.zIndex = 1;
//      }
//      this.style.zIndex = array.length;
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
          isDown = true;
          offset = [
            this.offsetLeft - event.clientX,
            this.offsetTop - event.clientY
          ];
      }

//      var array = document.getElementsByTagName("widget");
/*
      //
      // Envia para o TOPO O WIDGET ...
      //
      for (var i = 0; i < array.length; i++) {
          array[i].style.zIndex = 1;
      }
      this.style.zIndex = array.length;
*/
    }, true);

    o.addEventListener('mouseup', function() { isDown = false; }, true);

    o.addEventListener('mousemove', function(event) {
      if (isDown && event.clientY < this.offsetTop+30) {
        event.preventDefault();
        //
        // change widget position ( style value )
        //
        this.style.left = (event.clientX + offset[0]) + 'px';
        this.style.top  = (event.clientY + offset[1]) + 'px';
      }
    }, true);

  }

  b.appendChild(c); // close button
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
