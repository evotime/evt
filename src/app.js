
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {       
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.dzp);

        var size = cc.winSize;
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                var m=new cc.TMXTiledMap(res.map1);
                this.addChild(m);
                cc.log(m.properties);

            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        //test animation
       
        var n=ee.makeCommander();
       
        n.body.x=size.width/2;
        n.body.y=size.height/2-115;
        this.addChild(n.body,3);
        this.schedule(n.body.update,1/60);
        
        var n2=ee.makeCommander();
        n2.body.x=size.width/2+30;
        n2.body.scaleX=-1;
        n2.body.y=size.height/2-115;
        this.addChild(n2.body,3);
        n2.body.playAnim("attack3");
        this.schedule(n2.body.update,1/60);
        
        var ls2=cc.LabelTTF.create("9999","微软雅黑",32);
        
        ls2.color=cc.color(255,0,0,255);
        ls2.x=size.width/2+40;
        ls2.y=size.height-400;
        ls2.runAction(cc.sequence(cc.moveBy(0.5,cc.p(10,50)),cc.blink(2,10)));

        this.addChild(ls2);
        var ls=cc.LabelTTF.create("9999","微软雅黑",24);
        ls.color=cc.color(0,255,0,255);
        ls.x=size.width/2-40;
        ls.y=size.height-400;
        ls.runAction(cc.sequence(cc.moveBy(0.5,cc.p(-10,50)),cc.fadeTo(0.5,0)));

        this.addChild(ls);

     //   cc.audioEngine.playMusic(res.m,true);
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

