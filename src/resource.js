var res = {
    HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png",
    map1:"res/map/map1.tmx",
    png:"res/map/map.png",
    png1:"res/map/map1.png",
    png2:"res/map/map2.png",
    m:"res/m.mp3",

    dz:"res/dz.png",
    dzp:"res/dz.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}