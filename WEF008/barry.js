//survival difficulty
console.log("hello")
let radioElems2 = document.querySelectorAll("input[name=difflv]")
console.log(); (radioElems2.length)

for (let radioElem2 of radioElems2) {
    console.log("line7  " + radioElem2.value);
    radioElem2.addEventListener('change', () => {
        console.log("line9  ");
        radioElem3 = document.querySelector('input[name=difflv]:checked')
        console.log("line11  " + radioElem3.length);
        console.log("selected from barry.js: " + radioElem3.value);
        generate(radioElem3.value)
    }
    )
}

