import Console from 'vconsole'


var vConsole = new Console({});
if(!vConsole){
    console.log("not cons")
}
vConsole.setOption({maxLogNumber: 5000})

var myPlugin = new Console.VConsolePlugin('my_plugin', 'My Plugin');
vConsole.addPlugin(myPlugin);

// consoleTest()
function consoleTest() {


    console.log('foo');   // 白底黑字
    console.info('bar');  // 白底紫字
    console.debug('oh');  // 白底黄字
    console.warn('foo');  // 黄底黄字
    console.error('bar'); // 红底红字


    var obj = {};
    obj.foo = 'bar';
    console.log(obj);


    var uid = 233;
    console.log('UserID:', uid);

    console.log('[system]', 'foo'); // 'foo' 会输出到 System 面板
    console.log('[system] bar'); // 这行日志会输出到 Log 面板而非 System 面板
}
