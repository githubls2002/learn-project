/* eslint-disable */
const $ = require('jquery')

/**
* Creates objects with coordinates (x1, y1, x2, y2, cx, cy, width, height)
* to simulate DOM elements on the screen.
* Coords is used by Gridster to create a faux grid with any DOM element can
* collide.
*
* @class Coords
* @param {HTMLElement|Object} obj The jQuery HTMLElement or a object with: left,
* top, width and height properties.
* @return {Object} Coords instance.
* @constructor
*/
function Coords(obj) {
    if (obj[0] && $.isPlainObject(obj[0])) {
        this.data = obj[0];
    }else {
        this.el = obj;
    }

    this.isCoords = true;
    this.coords = {};
    this.init();
    return this;
}


var fn = Coords.prototype;


fn.init = function(){
    this.set();
    this.original_coords = this.get();
};


fn.set = function(update, not_update_offsets) {
    var el = this.el;
    if (el) {
      let data = {}
      let offset = el.offset()

      for (let key in offset) {
        data[key] = offset[key]
      }

      if (!update) {
          this.data = {...data}
          this.data.width = el.width();
          this.data.height = el.height();
      }

      if (update && !not_update_offsets) {
          this.data.top = data.top
          this.data.left = data.left
      }
    }

    /*
    if (el && !update) {
        this.data = el.offset();
        this.data.width = el.width();
        this.data.height = el.height();
    }

    if (el && update && !not_update_offsets) {
        var offset = el.offset();
        this.data.top = offset.top;
        this.data.left = offset.left;
    }
    */

    var d = this.data;

    typeof d.left === 'undefined' && (d.left = d.x1);
    typeof d.top === 'undefined' && (d.top = d.y1);

    this.coords.x1 = d.left;
    this.coords.y1 = d.top;
    this.coords.x2 = d.left + d.width;
    this.coords.y2 = d.top + d.height;
    this.coords.cx = d.left + (d.width / 2);
    this.coords.cy = d.top + (d.height / 2);
    this.coords.width  = d.width;
    this.coords.height = d.height;
    this.coords.el  = el || false ;

    return this;
};


fn.update = function(data){
    if (!data && !this.el) {
        return this;
    }

    if (data) {
        var new_data = $.extend({}, this.data, data);
        this.data = new_data;
        return this.set(true, true);
    }

    this.set(true);
    return this;
};


fn.get = function(){
  return this.coords;
};

fn.destroy = function() {
    this.el.removeData('coords');
    delete this.el;
};

//jQuery adapter
$.fn.coords = function() {
    if (this.data('coords') ) {
        return this.data('coords');
    }

    var ins = new Coords(this, arguments[0]);
    this.data('coords', ins);
    return ins;
};

export default Coords
