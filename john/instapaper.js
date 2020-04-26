/* [rewrite_local]
http-response ^https://www\.instapaper\.com/api/subscription_status equires-body=1,max-size=0,script-path=resources/js/instapaper.js
[mitm]
hostname = www.instapaper.com,

function re() {
  var body = $response.body;
  if (arguments[0].includes("@")) {
   var regs = arguments[0].split("@");
   var strs = arguments[1].split("@");
   for (i = 0;i < regs.length;i++) {
    var reg = new RegExp(regs[i],"g");
    // 另一种创建正则表达式的方式用 new RegExp构造函数
    body = body.replace(reg, strs[i]);
  }
 }
  else {
   var reg = new RegExp(arguments[0],"g");
   body = body.replace(reg, arguments[1]);
 }
  $done(body);
}
// re('.+','ipsubnow=1585760627&ipsubexp=1646033923&ipsub=1')
re('ipsubexp=@ipsub=\\d', 'ipsubexp=1646033923@ipsub=1')
 // 以设计让用户录入re('匹配1@匹配2@匹配3……', '替1@替2@替3……')，匹配中如果用到\d、\w等正则就以双斜杠出现。只替换一个则re('匹配1', '替1')
*/
var body = $response.body;
var reg1 = /ipsubexp=/g;
var reg2 = /ipsub=\d/g;
body = body.replace(reg1, 'ipsubexp=1646033923');
body = body.replace(reg2, 'ipsub=1');
$done(body);