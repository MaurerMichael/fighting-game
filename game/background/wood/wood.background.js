import {SimpleBackground} from "../simple.background.js";

export class WoodBackground extends SimpleBackground{

    groundLevel = 92

    shopFrame = 0

    nextFrame = true

    constructor(canvas, ctx) {
        super(canvas, ctx);

        this.image = new Image()
        this.image.src = "./game/background/wood/background.png"

        this.shop = new Image()
        this.shop.src = "./game/background/wood/shop_anim.png"

    }


    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y)

        const frameX = this.shop.width / 6
        const activeFrameX = frameX * this.shopFrame
        this.ctx.drawImage(this.shop, activeFrameX, 0, frameX, this.shop.height , 642, 224, frameX*2, this.shop.height*2)

        if(this.nextFrame){
            this.nextFrame = false
            setTimeout(()=> {
                ++this.shopFrame
                if(this.shopFrame === 6) {
                    this.shopFrame = 0
                }
                this.nextFrame = true
            }, 100)
        }
    }


}