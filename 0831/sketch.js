let min = 0;
let max;

let passage = "Thousands of protestors gathered in Ottawa over the past month – ostensibly to oppose vaccine mandates, but then adding several other demands that included, according to at least one manifesto filed online by organizers, a move to overthrow a democratically elected government.So you may be excused if you failed to notice one person amongst the crowds of people packed in front of the Parliament buildings as part of what some have described as an \"occupation\" of downtown Ottawa.Her name is Carmya Sa’d, an outspoken Toronto lawyer who has used her legal skills for progressive causes ranging from defending those charged with criminal offences to landlord and tenant disputes.Ottawa's deal with Sask. First Nation on Treaty 6 salary obligations sets stage for more negotiationThis time, Sa’d decided she needed to be a so-called “citizen journalist,” wading into the crowd of protestors – a group with whom she feels no kinship but wants to understand better – to document the goings-on amongst those demonstrating. She’s been keeping up with the essential parts of her legal practice while staying in Ottawa but has spent a large amount of he"
let passArr = [];
let posX = 10;
let posY = 10;
let posXArr = [10]; //posX
let posYArr = [10]; //posY
let widthArr = [];
let heightArr = [];

let w, h, str;
let wordCharSumArr = [];

// let r = 0;
// let g = 0;
// let b = 0;

let slider;
let radio;


function setup() {
    createCanvas(570, 700);
    background(240);

    slider = createSlider(0, 255, 180, 10);
    slider.position(100, height + 10);
    slider.style('width', '80px');

    radio = createRadio();
    radio.option('1', 'Mode1');
    radio.option('2', 'Mode2');
    radio.option('3', 'Mode3');
    radio.style('width', '80px');
    // radio.selected('1');
    textAlign(CENTER);
    fill(255, 0, 0);

    textSize(24);
    textAlign(LEFT, TOP);
    colorMode(HSB);

    passArr = passage.toLowerCase().split(' ');
    max = passArr.length;
    // text(passage,10,10,width-20,height-20);
    console.log(max, passArr);


    /* ------------------ draw paragraph block by block ------------------ */
    const ctx = canvas.getContext('2d');

    for (let i = min; i < max; i++) {

        let word = passArr[i].split('');
        let wordCharSum = 0;
        for (let k = 0; k < word.length; k++) {
            let eachLetter = word[k].charCodeAt(0) - 96;
            wordCharSum += eachLetter;
        }
        //console.log(wordCharSum);
        wordCharSumArr.push(wordCharSum);

        /* ------------------ calculate word width and height ------------------ */
        str = ctx.measureText(passArr[i]); // TextMetrics object
        w = str.width; // text obj width
        h = str.fontBoundingBoxAscent + str.fontBoundingBoxDescent; // text obj height
        posX += w + 10;
        if (posX < width) {
            posXArr.push(posX);
            posYArr.push(posY);
        } else if (posX >= width) {
            posY += h + 10;
            posX = 10;
            posXArr.push(posX);
            posYArr.push(posY);
        }
        //console.log(i,posXArr[i],w, posYArr[i],h);

        fill(0);
        noStroke();
        text(passArr[i], posXArr[i], posYArr[i]);

        noFill();
        //stroke('red');
        rect(posXArr[i], posYArr[i], w, h);

        widthArr.push(w);
        heightArr.push(h);
    };



    /* --------- generate 3 random numbers to pick 3 words --------- */

    //   let num1 = int(random(min,max));
    //   let num2 = int(random(min,max));
    //   let num3 = int(random(min,max));

    /* --------- count r,g,b value out of the picked 3 words --------- */

    //   let word1 = passArr[num1].split('');
    //   for(let i = 0;i < word1.length; i++){
    //     let eachLetter1 = word1[i].charCodeAt(0)-96;
    //     r += eachLetter1;
    //     // console.log(aEach,rVal);
    //   }

    //   let word2 = passArr[num2].split('');
    //   for(let i = 0;i < word2.length; i++){
    //     let eachLetter2 = word2[i].charCodeAt(0)-96;
    //     g += eachLetter2;
    //   }

    //   let word3 = passArr[num3].split('');
    //   for(let i = 0;i < word3.length; i++){
    //     let eachLetter3 = word3[i].charCodeAt(0)-96;
    //     b += eachLetter3;
    //   }

    //   console.log(num1,passArr[num1],r);
    //   console.log(num2,passArr[num2],g);
    //   console.log(num3,passArr[num3],b);

}

function draw() {
    let valSlider = slider.value();
    let valRadio = radio.value();

    for (let i = min; i < max - 1; i++) {

        if (valRadio) {
            let col = color(valSlider, 60, wordCharSumArr[i])

            if (valRadio === "1") {
                col = color(valSlider, 60, wordCharSumArr[i]);
            } else if (valRadio === "2") {
                col = color(wordCharSumArr[i], 60, valSlider);
            } else if (valRadio === "3") {
                col = color(wordCharSumArr[i], 60, wordCharSumArr[i + 1])
            }

            fill(col);
        }

        rect(posXArr[i], posYArr[i], widthArr[i], heightArr[i]);
    }

}