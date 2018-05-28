//-------------------------------------------------------------------
//
// Application API(0.1.0): WEB MODE
//
// START DATE: 26/05/2018 - 10:40
//
//-------------------------------------------------------------------
//
// not used in WEB MODE:
var argc = 0;
var argv = 0;
//
var main_widget;
var zIndex = 1;
var isTouch = false;
var offset = [0, 0];
var isDown = false; // "mouse_clicked"

function app_init (ac, av) {
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
        //mx = event.clientX;
        //my = event.clientY;
        main_widget.style.left = (event.clientX + offset[0]) + 'px';
        main_widget.style.top  = (event.clientY + offset[1]) + 'px';
      }//: if (isDown)
    }//: document.onmousemove = function(event)
  }//: if (isTouch==false)

  return 1;
}

function app_new_window (x,y,w,h,txt) {
  var o=document.createElement("widget");
  var b=document.createElement("widget_titlebar");

//  o.setAttribute("id", "main_body");

  o.style.left = x+'px';
  o.style.top = y+'px';
  o.style.width = w+'px';
  o.style.height = h+'px';

  // EVENTS:
  //
  if (isTouch) {
    // ...
  } else {
    //-------------------------------------------
    // DESKTOP MOUSE EVENT:
    //-------------------------------------------
    //
    o.addEventListener('mousedown', function(event) {

      this.style.zIndex = zIndex++; // move element to top:
      main_widget = this;

      // click in title_bar:
      //
      if (event.clientY-this.offsetTop < 35) {
        isDown = true; //<<<<<<<  enable here  >>>>>>>
        offset = [
          this.offsetLeft - event.clientX,
          this.offsetTop - event.clientY
        ];
      }

    }, true);

    o.addEventListener('mouseup', function() { isDown = false; }, true);

    // NONE SEE( document.onmousemove )
    //
    // o.addEventListener('mousemove', function(event) {  }, true);

  }//: events ...

  o.appendChild(b); // add title
  document.body.appendChild(o); // add here

  return o;
}
