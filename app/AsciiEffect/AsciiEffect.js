import Cell from "./CellClass.js";

class AsciiEffect {
    #imageCellArray = [];
    #pixels = [];
    #ctx;
    #width;
    #height;
    #bright;
    #gamma;
    #saturation;
    #hue;

    //データの初期化
    constructor(ctx, width, height, image1, font, bright, gamma, saturation, hue, symbols) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#bright = bright;
        this.#gamma = gamma;
        this.#saturation = saturation;
        this.#hue = hue;
        this.#ctx.font = `bold ${font}px monospace`;
        this.#ctx.drawImage(image1, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
        this.symbols = symbols;
    }

    // パラメータの更新
    updateParameters(bright, gamma, saturation, hue) {
        this.#bright = bright;
        this.#gamma = gamma;
        this.#saturation = saturation;
        this.#hue = hue;
    }

    #RGB2HSL(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);

        let h = 0,
            s = 0,
            l = Math.ceil((max + min) / 5.1); // lを0〜100の範囲にスケールする

        if (max === min) {
            return [h, s, l];
        }

        const delta = max - min;

        // 色相の計算
        switch (max) {
            case r:
                h = (60 * ((g - b) / delta) + 360) % 360;
                break;
            case g:
                h = (60 * ((b - r) / delta) + 120) % 360;
                break;
            case b:
                h = (60 * ((r - g) / delta) + 240) % 360;
                break;
        }

        // 彩度の計算
        if (l <= 50) {
            s = (delta / (max + min)) * 100;
        } else {
            s = (delta / (510 - max - min)) * 100;
        }

        return [h, s, l];
    }

    #HSL2RGB(h, s, l) {
        s /= 100;
        l /= 100;

        const C = (1 - Math.abs(2 * l - 1)) * s;
        const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - C / 2;

        let r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = C;
            g = X;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = X;
            g = C;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = C;
            b = X;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = X;
            b = C;
        } else if (240 <= h && h < 300) {
            r = X;
            g = 0;
            b = C;
        } else if (300 <= h && h < 360) {
            r = C;
            g = 0;
            b = X;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return [r, g, b];
    }

    //アスキーアートとなる文字を決定する
    #convertToSymbol(g) {
        // switch (g) {
        //     case 100:
        //         return ".";
        //     case 60:
        //         return "e";
        //     case 150:
        //         return "S";
        //     case 200:
        //         return "K";
        //     case 250:
        //         return "O";
        //     default:
        //         return "";
        // }

        const index = Math.floor((g / 255) * (this.symbols.length - 1));
        return this.symbols[index];
    }

    //画像の明るさ、コントラスト、ガンマ補正を行う
    #ApplyEffectToRGB(red, green, blue) {
        //  brightness
        red *= this.#bright;
        green *= this.#bright;
        blue *= this.#bright;

        //  gamma
        red = 255 * Math.pow(red / 255, 1 / this.#gamma);
        green = 255 * Math.pow(green / 255, 1 / this.#gamma);
        blue = 255 * Math.pow(blue / 255, 1 / this.#gamma);

        //  saturation
        const [h, s, l] = this.#RGB2HSL(red, green, blue);
        const [r, g, b] = this.#HSL2RGB(h * this.#hue, s * this.#saturation, l);

        return [r, g, b];
    }

    #ToConstantGragColor(color) {
        if (color < 50) {
            return 0;
        } else if (color < 60) {
            return 60;
        } else if (color < 100) {
            return 100;
        } else if (color < 150) {
            return 150;
        } else if (color < 200) {
            return 200;
        } else if (color < 250) {
            return 250;
        } else {
            return 250;
        }
    }

    //画像をスキャンしてアスキーアートを作成する
    #scanImage(cellSize) {
        this.#imageCellArray = [];

        const aspectRatio = this.#pixels.width / this.#pixels.height;
        const stepX = Math.max(1, Math.floor(this.#pixels.width / cellSize));
        const stepY = Math.max(1, Math.floor(stepX * aspectRatio));

        for (let y = 0; y < this.#pixels.height; y += stepY) {
            for (let x = 0; x < this.#pixels.width; x += stepX) {
                const posX = x * 4; // 4 is the number of elements in the array for each pixel (r,g,b,a)
                const posY = y * 4; // 4 is the number of elements in the array for each pixel (r,g,b,a)
                const pos = posY * this.#pixels.width + posX;

                if (this.#pixels.data[pos + 3] > 0) {
                    let red = this.#pixels.data[pos];
                    let green = this.#pixels.data[pos + 1];
                    let blue = this.#pixels.data[pos + 2];

                    [red, green, blue] = this.#ApplyEffectToRGB(red, green, blue);

                    const total = red + green + blue;
                    const averageColorValue = this.#ToConstantGragColor(total / 3);
                    const color = "rgb(" + red + "," + green + "," + blue + ")";
                    // const monochrome = "rgb(" + averageColorValue + "," + averageColorValue + "," + averageColorValue + ")";
                    const symbol = this.#convertToSymbol(averageColorValue);
                    if (averageColorValue >= 50) this.#imageCellArray.push(new Cell(x, y, symbol, color));
                }
            }
        }
    }

    //アスキーアートを描画する
    #drawAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height); // Use dynamic width and height
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx);
        }
    }

    //アスキーアートを描画する
    draw(cellSize) {
        this.#scanImage(cellSize);
        this.#drawAscii();
    }
}

export default AsciiEffect;
