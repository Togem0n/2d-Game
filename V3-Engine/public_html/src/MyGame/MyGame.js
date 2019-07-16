/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {    
    // The camera to view the scene
    this.logo1 = "assets/logo1.png"
    this.mCamera = null;
    this.msquare1 = null;
    this.msquare2 = null;
    this.msquare3 = null;
    this.msquare4 = null;
    this.msquare5 = null;
    this.msquare6 = null;
    this.msquare7 = null;
    this.msquare8 = null;
    this.msquare9 = null;
    this.mHero = null;
    this.BboxSet = null;
    
    //光
    this.heroLight = null;
    
    this.heroCamera = null;
    this.kDelta = 5;
    
    this.kDelta = 0.5;
    this.mMsg = null;
    this.mMsg2 = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.logo1);
};

MyGame.prototype.unloadScene = function () {

};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                     // width of camera
        [0, 0, 630, 630]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([1,0.98,0.85,1]);
    
    this.heroCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                     // width of camera
        [0, 0, 63, 63]         // viewport (orgX, orgY, width, height)
    );
    this.heroCamera.setBackgroundColor([1, 1, 1, 1]);
    
    this.heroLight = new Light();
    
    this.heroLight.setLightType(Light.eLightType.ePointLight);
    this.heroLight.setColor([1, 1, 1, 1]);
    //this.heroLight.setXPos(this.mHero.getXform().getXPos());
//    this.heroLight.setYPos(x[1]);
//    this.heroLight.setZPos(5);
//    this.heroLight.setDirection([0, 0, -1]);
//    this.heroLight.setNear(8);
//    this.heroLight.setFar(14);
//    this.heroLight.setInner(0.1);
//    this.heroLight.setOuter(-0.05);
//    this.heroLight.setIntensity(3);
//    this.heroLight.setDropOff(1.0);
//    this.heroLight.setLightTo(false);
    
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    var r1 = new Renderable();
    r1.setColor([0, 0, 0, 1]);
    this.msquare1 = new GameObject(r1);
    this.msquare1.getXform().setPosition(55, 15);
    this.msquare1.getXform().setSize(90, 30);
    //this.msquare1.setColor([0, 0, 0, 1]); 
    
    var r2 = new Renderable();
    r2.setColor([0, 0, 0, 1]);
    this.msquare2 = new GameObject(r2);
    this.msquare2.getXform().setPosition(10, 70);
    this.msquare2.getXform().setSize(20, 60);
    //this.msquare2.setColor([0, 0, 0, 1]); 
    
    var r3 = new Renderable();
    r3.setColor([0, 0, 0, 1]);
    this.msquare3 = new GameObject(r3);
    this.msquare3.getXform().setPosition(35, 95);
    this.msquare3.getXform().setSize(30, 10);
    //this.msquare3.setColor([0, 0, 0, 1]); 
    
    var r4 = new Renderable();
    r4.setColor([0, 0, 0, 1]);
    this.msquare4 = new GameObject(r4);
    this.msquare4.getXform().setPosition(70, 95);
    this.msquare4.getXform().setSize(20, 10);

    var r5 = new Renderable();
    r5.setColor([0, 0, 0, 1]);
    this.msquare5 = new GameObject(r5);
    this.msquare5.getXform().setPosition(40, 60);
    this.msquare5.getXform().setSize(20, 40);
 
    var r6 = new Renderable();
    r6.setColor([0, 0, 0, 1]);
    this.msquare6 = new GameObject(r6);
    this.msquare6.getXform().setPosition(55, 75);
    this.msquare6.getXform().setSize(10, 10);
    
    var r7 = new Renderable();
    r7.setColor([0, 0, 0, 1]);
    this.msquare7 = new GameObject(r7);
    this.msquare7.getXform().setPosition(70, 60);
    this.msquare7.getXform().setSize(20, 40);
    
    var r8 = new Renderable();
    r8.setColor([0, 0, 0, 1]);
    this.msquare8 = new GameObject(r8);
    this.msquare8.getXform().setPosition(95, 70);
    this.msquare8.getXform().setSize(10, 60);
    
    this.msquare9 = new Renderable();
    this.msquare9.getXform().setPosition(5, 95);
    this.msquare9.getXform().setSize(10, 10);
    this.msquare9.setColor([1, 0, 0, 1]);

    this.mHero = new Hero(this.logo1);
    
    var sq1Bbox = this.msquare1.getBBox();
    var sq2Bbox = this.msquare2.getBBox();
    var sq3Bbox = this.msquare3.getBBox();
    var sq4Bbox = this.msquare4.getBBox();
    var sq5Bbox = this.msquare5.getBBox();
    var sq6Bbox = this.msquare6.getBBox();
    var sq7Bbox = this.msquare7.getBBox();
    var sq8Bbox = this.msquare8.getBBox();
    
    this.BboxSet = new GameObjectSet();
    this.BboxSet.addToSet(sq1Bbox);
    this.BboxSet.addToSet(sq2Bbox);
    this.BboxSet.addToSet(sq3Bbox);
    this.BboxSet.addToSet(sq4Bbox);
    this.BboxSet.addToSet(sq5Bbox);   
    this.BboxSet.addToSet(sq6Bbox);
    this.BboxSet.addToSet(sq7Bbox);
    this.BboxSet.addToSet(sq8Bbox);
    
   
};


MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    this.msquare1.draw(this.mCamera);
    this.msquare2.draw(this.mCamera);
    this.msquare3.draw(this.mCamera);
    this.msquare4.draw(this.mCamera);
    this.msquare5.draw(this.mCamera);
    this.msquare6.draw(this.mCamera);
    this.msquare7.draw(this.mCamera);
    this.msquare8.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.BboxSet.draw(this.mCamera);
    
    
    //this.msquare9.draw(this.mCamera);
    
};

MyGame.prototype.update = function () {
    this.mCamera.update();
    this.mHero.update();
    this.heroCamera.update();
    //this.BboxSet.update();
    
//    var hBbox = this.mHero.getBBox();
//    var sq1Bbox = this.msquare1.getBBox();
    
    
    var xform = this.mHero.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.mHero.getXform().getYPos() <= 98) {
        xform.incYPosBy(this.kDelta);
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incYPosBy(-this.kDelta);     
        }
        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.mHero.getXform().getYPos() >= 2) {
        xform.incYPosBy(-this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incYPosBy(this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incYPosBy(this.kDelta);     
        }

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.mHero.getXform().getXPos() >= 2) {
        xform.incXPosBy(-this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incXPosBy(this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incXPosBy(this.kDelta);     
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mHero.getXform().getXPos() <= 98) {
        xform.incXPosBy(this.kDelta);
//        var hBbox = this.mHero.getBBox();
//        var sq1Bbox = this.msquare1.getBBox();
//        if(hBbox.intersectsBound(sq1Bbox)){
//            xform.incXPosBy(-this.kDelta);
//        }
        var hBbox = this.mHero.getBBox();
        var sq1Bbox = this.msquare1.getBBox();
        var sq2Bbox = this.msquare2.getBBox();
        var sq3Bbox = this.msquare3.getBBox();
        var sq4Bbox = this.msquare4.getBBox();
        var sq5Bbox = this.msquare5.getBBox();
        var sq6Bbox = this.msquare6.getBBox();
        var sq7Bbox = this.msquare7.getBBox();
        var sq8Bbox = this.msquare8.getBBox();
        if(hBbox.intersectsBound(sq1Bbox) ||
                hBbox.intersectsBound(sq2Bbox) ||
                hBbox.intersectsBound(sq3Bbox) ||
                hBbox.intersectsBound(sq4Bbox) ||
                hBbox.intersectsBound(sq5Bbox) ||
                hBbox.intersectsBound(sq6Bbox) ||
                hBbox.intersectsBound(sq7Bbox) ||
                hBbox.intersectsBound(sq8Bbox) 
                ){
            xform.incXPosBy(-this.kDelta);     
        }
    }
    
};
