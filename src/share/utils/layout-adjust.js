export function elementInViewportWithMargin(el , margin) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    var mt = 0 , mr= 0 , mb = 0, ml = 0;
    if(Object.prototype.toString.call(margin) === '[object Array]'){
        mt = margin[0];
        mr = margin[1];
        mb = margin[2];
        ml = margin[3];
        // console.log('is Array')
    }


    while(el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    console.log( top , (window.pageYOffset + mt))
    console.log(left ,(window.pageXOffset + ml))
    console.log( (top + height) ,(window.pageYOffset + window.innerHeight - mb))
    console.log((left + width) , (window.pageXOffset + window.innerWidth - mr))
    return (
        // top >= (window.pageYOffset + mt) &&
        // left >= (window.pageXOffset + ml)&&
        (top + height) <= (window.pageYOffset + window.innerHeight - mb)
        // &&
        // (left + width) <= (window.pageXOffset + window.innerWidth - mr)
    );
}


function getViewport() {

    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth,
            viewPortHeight = window.innerHeight
    }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth,
            viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
}

function collide(el1, el2 , margin) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    var mt = 0 , mr= 0 , mb = 0, ml = 0;
    if(Object.prototype.toString.call(margin) === '[object Array]'){
        mt = margin[0];
        mr = margin[1];
        mb = margin[2];
        ml = margin[3];
    }

    return !(
        (rect1.top - mt) > (rect2.bottom + mb) ||
        (rect1.right + mr) < (rect2.left + ml)||
        (rect1.bottom - mb) < (rect2.top + mt)||
        (rect1.left - ml) > (rect2.right + mr)
    );
}
//el1 in el2
function inside(el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return (
        ((rect2.top <= rect1.top) && (rect1.top <= rect2.bottom)) &&
        ((rect2.top <= rect1.bottom) && (rect1.bottom <= rect2.bottom)) &&
        ((rect2.left <= rect1.left) && (rect1.left <= rect2.right)) &&
        ((rect2.left <= rect1.right) && (rect1.right <= rect2.right))
    );
}

//el1 in el2
function insideWithMargin(el1, el2 , margin) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    var mt = 0 , mr= 0 , mb = 0, ml = 0;
    if(Object.prototype.toString.call(margin) === '[object Array]'){
        mt = margin[0];
        mr = margin[1];
        mb = margin[2];
        ml = margin[3];
    }

    console.log(rect1.top - mt , rect2.top   )
    console.log(rect1.bottom + mb ,rect2.bottom )
    console.log(rect1.left - ml ,rect2.left )
    console.log(rect1.right + mr, rect2.right )

    return (
        ((rect2.top  <= (rect1.top - mt)) && (rect1.top <= rect2.bottom)) &&
        ((rect2.top <= rect1.bottom ) && ((rect1.bottom + mb) <= rect2.bottom)) &&
        ((rect2.left <= (rect1.left - ml)) && (rect1.left <= rect2.right)) &&
        ((rect2.left <= rect1.right) && ((rect1.right + mr)<= rect2.right))
    );
}
