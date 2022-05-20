import {SoulPlayer} from "../soul.player.js";

export class KnightPlayer extends SoulPlayer{

    gravity = 1
    health = 140

    activeAnimation
    maxFrames = 0
    frame = 0
    frameDelay = 100
    nextFrame=true
    offset={x: 0, y:0}

    constructor(canvas, context, startPosition, keyBindings, rightCorner, ground) {
        super(canvas, context, startPosition, keyBindings, rightCorner, ground);

        this.idleSprite = new Image()
        this.idleSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Idle.png"
        this.idleFrames = 10
        this.idleSprite.onload = () => this.resetPosition()


        this.jumpSprite = new Image()
        this.jumpSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Jump.png"
        this.jumpFrames = 2

        this.runSprite = new Image()
        this.runSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Run.png"
        this.runFrames = 6

        this.getHitSprite = new Image()
        this.getHitSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Get Hit.png"
        this.hitFrames = 3

        this.fallSprite = new Image()
        this.fallSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Fall.png"
        this.fallFrames = 2

        this.deathSprite = new Image()
        this.deathSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Death.png"
        this.deathFrames = 9

        this.attackOneSprite = new Image()
        this.attackOneSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Attack1.png"
        this.attackOneFrames = 4

        this.attackTwoSprite = new Image()
        this.attackTwoSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Attack2.png"
        this.attackTwoFrames = 4

        this.attackThreeSprite = new Image()
        this.attackThreeSprite.src = "./game/player/Medieval Warrior Pack 3/Sprites/Attack3.png"
        this.attackThreeFrames = 5

    }

    resetPosition() {
        this.ground += 122
        this.width = this.idleSprite.width / this.idleFrames
        this.height = this.idleSprite.height
        this.offset = {
            x: 0,
            y: 0
        }
        this.position = {x: this.rightCorner ? this.startPosition - this.width : this.startPosition, y: this.canvas.height - (this.height + this.ground)}

        this.defaultFrame()
    }

    defaultFrame() {
        this.activeAnimation = this.idleSprite
        this.frameDelay = 100
        this.maxFrames = this.idleFrames
    }

    draw() {
        if(!this.activeAnimation){
            this.defaultFrame()
        }

        const frameX = this.activeAnimation.width / this.maxFrames
        const activeFrameX = frameX * this.frame
        this.ctx.drawImage(
            this.activeAnimation,
            activeFrameX,
            0,
            frameX,
            this.activeAnimation.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            this.width,
            this.height
        )

        if(this.nextFrame) {
            this.nextFrame = false
            setTimeout(()=> {
                ++this.frame
                if(this.frame >= this.maxFrames) {
                    this.frame = 0
                }
                this.nextFrame = true
            }, this.frameDelay)
        }
    }

    moveRight() {
        super.moveRight();
        this.frame = 0
        this.activeAnimation = this.runSprite
        this.frameDelay = 100
        this.maxFrames = this.runFrames
    }

    moveLeft() {
        super.moveLeft();
        this.frame = 0
        this.activeAnimation = this.runSprite
        this.frameDelay = 100
        this.maxFrames = this.runFrames
    }

    jump() {
        super.jump();
        this.frame = 0
        this.activeAnimation = this.jumpSprite
        this.frameDelay = 100
        this.maxFrames = this.jumpFrames
    }

    attackOne() {
        super.attackOne();
    }


    attackTwo() {
        super.attackTwo();
    }

    attackThree() {
        super.attackThree();
    }
}