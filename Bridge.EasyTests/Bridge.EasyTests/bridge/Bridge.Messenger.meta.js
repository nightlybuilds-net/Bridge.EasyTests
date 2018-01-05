Bridge.assembly("Bridge.Messenger", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,System.Collections.Generic,Bridge.Messenger];
    $m($n[2].Messenger, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":1,"n":"InnerSend","t":8,"pi":[{"n":"message","pt":$n[0].String,"ps":0},{"n":"senderType","pt":Function,"ps":1},{"n":"argType","pt":Function,"ps":2},{"n":"sender","pt":$n[0].Object,"ps":3},{"n":"args","pt":$n[0].Object,"ps":4}],"sn":"InnerSend","rt":$n[0].Void,"p":[$n[0].String,Function,Function,$n[0].Object,$n[0].Object]},{"a":1,"n":"InnerSubscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"senderType","pt":Function,"ps":2},{"n":"argType","pt":Function,"ps":3},{"n":"callback","pt":Function,"ps":4}],"sn":"InnerSubscribe","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String,Function,Function,Function]},{"a":1,"n":"InnerUnsubscribe","t":8,"pi":[{"n":"message","pt":$n[0].String,"ps":0},{"n":"senderType","pt":Function,"ps":1},{"n":"argType","pt":Function,"ps":2},{"n":"subscriber","pt":$n[0].Object,"ps":3}],"sn":"InnerUnsubscribe","rt":$n[0].Void,"p":[$n[0].String,Function,Function,$n[0].Object]},{"a":2,"n":"ResetMessenger","t":8,"sn":"ResetMessenger","rt":$n[0].Void},{"a":2,"n":"Send","t":8,"pi":[{"n":"sender","pt":System.Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":1,"tprm":["TSender"],"sn":"Send","rt":$n[0].Void,"p":[System.Object,$n[0].String]},{"a":2,"n":"Send","t":8,"pi":[{"n":"sender","pt":System.Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"args","pt":System.Object,"ps":2}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Send$1","rt":$n[0].Void,"p":[System.Object,$n[0].String,System.Object]},{"a":2,"n":"Subscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"callback","pt":Function,"ps":2},{"n":"source","dv":null,"o":true,"pt":System.Object,"ps":3}],"tpc":1,"tprm":["TSender"],"sn":"Subscribe","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String,Function,System.Object]},{"a":2,"n":"Subscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"callback","pt":Function,"ps":2},{"n":"source","dv":null,"o":true,"pt":System.Object,"ps":3}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Subscribe$1","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String,Function,System.Object]},{"a":2,"n":"Unsubscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":1,"tprm":["TSender"],"sn":"Unsubscribe","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String]},{"a":2,"n":"Unsubscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Unsubscribe$1","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String]},{"a":1,"n":"_calls","t":4,"rt":$n[1].Dictionary$2(System.Object,System.Collections.Generic.List$1(System.Object)),"sn":"_calls","ro":true}]}; });
    $m($n[2].IMessenger, function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"ResetMessenger","t":8,"sn":"Bridge$Messenger$IMessenger$ResetMessenger","rt":$n[0].Void},{"ab":true,"a":2,"n":"Send","t":8,"pi":[{"n":"sender","pt":System.Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":1,"tprm":["TSender"],"sn":"Bridge$Messenger$IMessenger$Send","rt":$n[0].Void,"p":[System.Object,$n[0].String]},{"ab":true,"a":2,"n":"Send","t":8,"pi":[{"n":"sender","pt":System.Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"args","pt":System.Object,"ps":2}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Bridge$Messenger$IMessenger$Send$1","rt":$n[0].Void,"p":[System.Object,$n[0].String,System.Object]},{"ab":true,"a":2,"n":"Subscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"callback","pt":Function,"ps":2},{"n":"source","dv":null,"o":true,"pt":System.Object,"ps":3}],"tpc":1,"tprm":["TSender"],"sn":"Bridge$Messenger$IMessenger$Subscribe","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String,Function,System.Object]},{"ab":true,"a":2,"n":"Subscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1},{"n":"callback","pt":Function,"ps":2},{"n":"source","dv":null,"o":true,"pt":System.Object,"ps":3}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Bridge$Messenger$IMessenger$Subscribe$1","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String,Function,System.Object]},{"ab":true,"a":2,"n":"Unsubscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":1,"tprm":["TSender"],"sn":"Bridge$Messenger$IMessenger$Unsubscribe","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String]},{"ab":true,"a":2,"n":"Unsubscribe","t":8,"pi":[{"n":"subscriber","pt":$n[0].Object,"ps":0},{"n":"message","pt":$n[0].String,"ps":1}],"tpc":2,"tprm":["TSender","TArgs"],"sn":"Bridge$Messenger$IMessenger$Unsubscribe$1","rt":$n[0].Void,"p":[$n[0].Object,$n[0].String]}]}; });
});
