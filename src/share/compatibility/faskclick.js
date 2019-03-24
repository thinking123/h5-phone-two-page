import FastClick from 'fastclick'
if ('addEventListener' in document) {
    console.log('fast click attach')
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
