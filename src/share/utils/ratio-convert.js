import $ from 'jquery'
// const titleSizeRatio = 0.15
// const inputHeightRatio = 0.183
// const inputFontsizeRatio = 0.097
// const buttonWidthRatio = 0.272
// const buttonHeightRatio = 0.195
// const buttonFontsizeRatio = 0.108
//
// const needAdjustRatio = 0.9

const titleSizeRatio = 0.17
const inputHeightRatio = 0.2
const inputFontsizeRatio = 0.15
const buttonWidthRatio = 0.35
const buttonHeightRatio = 0.21
const buttonFontsizeRatio = 0.09

const needAdjustRatio = 0.9
export function needAdjust(bodyW , btnW , btnNum = 1) {
    const c = btnW * btnNum * 1.0/ bodyW

    console.log('dialog ratio', c)

    return c > needAdjustRatio
}


export function adjustRatio(componentName , bodyW , bodyH , title , input , button1 , button2 , haveLine = false) {

    let addW = bodyW*0.15
    let addH = bodyH*0.06
    let addF = bodyH*0.05

    if(title){
        let tf = bodyH * titleSizeRatio

        if(!button2){
            tf += addF

            if(!haveLine){
                tf += addF
            }else{
                tf -= addF
            }
        }
        console.log('title font size' , tf)
        $(title).css('font-size' , tf , 'important')

    }


//     $('input').addClass('your-class');
//
// .your-class::-webkit-input-placeholder {
//         color: #b2cde0
//     }
    if(input){
        const h = bodyH * inputHeightRatio
        const f = bodyH * inputFontsizeRatio

        const styleName = `.${componentName}-input-adjust-ratio-style`
        const style = `input.${componentName}-input-adjust-ratio-style::placeholder{
            font-size:${f}px !important;
        }`

        addStyleToHtml(style)
        $(input).addClass(styleName)
        console.log('input font size' , f , h)
        $(input).css('font-size' , f , 'important')
        $(input).css('height' , h , 'important')
    }

    if(button1){
        const f = bodyH * buttonFontsizeRatio
        let w = bodyW * buttonWidthRatio
        let h = bodyH * buttonHeightRatio

        if(!button2){
            h += addH
            w += addW

            if(!haveLine){
                h += addH
                w += addW
            }
        }

        console.log('title font size' , f , w , h)
        $(button1).css('font-size' , f , 'important')
        $(button1).css('height' , h , 'important')
        $(button1).css('width' , w , 'important')
    }

    if(button2){
        const f = bodyH * buttonFontsizeRatio
        const w = bodyW * buttonWidthRatio
        const h = bodyH * buttonHeightRatio
        console.log('title font size' , f , w , h)
        $(button2).css('font-size' , f , 'important')
        $(button2).css('height' , h , 'important')
        $(button2).css('width' , w , 'important')
    }
}

function addStyleToHtml(css) {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}
