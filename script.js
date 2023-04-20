let inp = document.getElementById("tab1");
let encodeButton = document.getElementById("encode");
let encodedData = document.getElementById("tab2");
let decodedButton = document.getElementById("decode");
let decodedData = document.getElementById("tab3");
let reset = document.getElementById("reset");
var input = "";
var encoded = "";
var decoded = "";

class huffmanNode {

    constructor(char, freq, left, right) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

class huffmanCoding {

    getMappings(data) {
        var freqMap = this.freqMapping(data);
        var node = this.sortByFreq(freqMap);
        this.root = this.buildTree(node);
        var codes = this.createCodes(this.root);
        return codes;
    }

    freqMapping(data) {
        var mp = new Map();
        for (let i = 0; i < data.length; i++) {
            let char = data.charAt(i);
            if (!mp.has(char)) {
                mp.set(char, 1);
            } else {
                let temp = mp.get(char);
                mp.set(char, temp++);
            }
        }
        return mp;
    }

    sortByFreq(mp) {
        var queue = [];
        for (let it of mp.entries()) {
            queue.push(new huffmanNode(it[0], it[1], null, null));
        }
        queue.sort((a, b) => a.freq - b.freq)
        return queue;
    }

    buildTree(node) {
        while (node.length > 1) {
            let node1 = node.shift();
            let node2 = node.shift();
            let node3 = new huffmanNode('', node1.frequency + node2.frequency, node1, node2);
            node.push(node3);
        }
        return node.shift();
    }

    createCodes(node) {
        var mp = new Map();
        this.fun(node, mp, "");
        return mp;
    }

    fun(node, mp, str) {
        if (!node.left && !node.right) {
            mp.set(node.char, str);
            return;
        }
        this.fun(node.left, mp, str + '0');
        this.fun(node.right, mp, str + '1');
    }

    encode(codes, data) {
        var str = "";
        for (let i = 0; i < data.length; i++) {
            str += codes.get(data.charAt(i));
        }
        return str;
    }

    decode(data) {
        var str = "";
        var cur = this.root;
        for (let i = 0; i < data.length; i++) {
            if (data.charAt(i) == '1') cur = cur.right;
            else cur = cur.left;
            if (!cur.left && !cur.right) {
                str += cur.char;
                cur = this.root;
            }
        }
        return str;
    }
}

encodeButton.addEventListener("click", () => {
    input = inp.value;
    var huffman = new huffmanCoding();
    var codes = huffman.getMappings(input);
    encoded = huffman.encode(codes, input);
    encodedData.value += encoded;
    decoded = huffman.decode(encoded);
});

decodedButton.addEventListener("click", () => {
    decodedData.value += decoded;
});

reset.addEventListener("click", () => {
    inp.value = "";
    encodedData.value = "";
    decodedData.value = "";
    decoded = "";
});