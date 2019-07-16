/*
 * File: UIDemo.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UIDemo() {
    this.kUIButton = "assets/UI/ElectricButton.png";
    this.kUIButton2 = "assets/UI/BlueButton.png";
    this.kBG = "assets/UI/bg.png";
    this.kBgClip = "assets/AudioTest/BGClip.mp3";
    this.kCue = "assets/AudioTest/BlueLevel_cue.wav";

    this.square1 = null;
    // The camera to view the scene
    this.mCamera = null;

}
gEngine.Core.inheritPrototype(UIDemo, Scene);


UIDemo.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
    gEngine.Textures.loadTexture(this.kUIButton2);
    gEngine.Textures.loadTexture(this.kBG);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

UIDemo.prototype.unloadScene = function () {
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.Textures.unloadTexture(this.kUIButton);
    gEngine.Textures.unloadTexture(this.kUIButton2);
    gEngine.Textures.unloadTexture(this.kBG);
    gEngine.Core.startScene(new MyGame());
};

UIDemo.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        20,                     // width of camera
        [20, 40, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    this.square1 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.square1.setColor([0, 0, 1, 1]);
    this.square1.getXform().setPosition(20, 20);
    this.square1.getXform().setSize(10, 10);
            // sets the background to gray
    //gEngine.DefaultResources.setGlobalAmbientIntensity(10);
    
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
UIDemo.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.square1.draw(this.mCamera.getVPMatrix());
};

UIDemo.prototype.update = function () {
    this.mCamera.update();
 
};
