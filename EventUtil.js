var EventUtil = {
                addhandler:function(element,type,handler) {
                    if(element.addEventListener) {
                        element.addEventListener(type,handler,false);
                    } else if (element.attachEvent) {
                        element.attachEvent("on"+type,handler);
                    } else {
                        element["on"+type] = handler;                        
                    }
                },
                
                getEvent:function(event) {
                    return event?event:window.event; 
                },
                
                getTarget:function() {
                    return event.target || event.srcElement;
                },
                
                preventDefault:function(event) {
                    if(event.preventDefault) {
                        event.preventDefault();
                    } else {
                        event.returnValue = false;                        
                    }
                },
                
                stopPropagation:function() {
                    if(event.stopPropagation) {
                        event.stopPropagation();
                    } else {
                        event.cancelBuddle = true;
                    }
                },
                
                removehandler:function(element,type,handler) {
                    if(element.removeEventListenter) {
                        element.addEventListenter(type,handler,false);
                    } else if (element.detachEvent) {
                        element.detachEvent("on"+type,handler);
                    } else {
                        element["on"+type] = null;                        
                    }
                }
            }


if (!Array.prototype.map) {
    Array.prototype.map = function(fun) {
        var collect = [];
        for (var ix = 0; ix < this.length; ix++) { collect[ix] = fun(this[ix]); }
        return collect;
    }
}