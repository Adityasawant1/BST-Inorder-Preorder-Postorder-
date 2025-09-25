// Get DOM elements
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const insertNodeBtn = document.getElementById('insertNodeBtn');
const nodeValueInput = document.getElementById('nodeValue');
const inorderBtn = document.getElementById('inorderBtn');
const preorderBtn = document.getElementById('preorderBtn');
const postorderBtn = document.getElementById('postorderBtn');
const resetBtn = document.getElementById('resetBtn');
const traversalResult = document.getElementById('traversalResult');

// BST Node class
class Node {
    constructor(value, x, y) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x; 
        this.y = y;
    }
}

// Global Root Node
let root = null;

// Insert into BST
function insert(value) {
    if (!root) {
        root = new Node(value, canvas.width / 2, 50);
    } else {
        insertRec(root, value, canvas.width / 2, 50, canvas.width / 4);
    }
    drawTree();
}

function insertRec(node, value, x, y, offset) {
    if (value < node.value) {
        if (!node.left) {
            node.left = new Node(value, x - offset, y + 80);
        } else {
            insertRec(node.left, value, x - offset, y + 80, offset / 2);
        }
    } else if (value > node.value) {
        if (!node.right) {
            node.right = new Node(value, x + offset, y + 80);
        } else {
            insertRec(node.right, value, x + offset, y + 80, offset / 2);
        }
    } else {
        alert("Duplicate values not allowed in BST!");
    }
}

// Draw BST
function drawTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawNode(root);
}

function drawNode(node) {
    if (!node) return;

    // Draw left edge
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
    }

    // Draw right edge
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
    }

    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#4CAF50";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.value, node.x, node.y);

    drawNode(node.left);
    drawNode(node.right);
}

// Traversals
function inorder(node, result = []) {
    if (node) {
        inorder(node.left, result);
        result.push(node.value);
        inorder(node.right, result);
    }
    return result;
}

function preorder(node, result = []) {
    if (node) {
        result.push(node.value);
        preorder(node.left, result);
        preorder(node.right, result);
    }
    return result;
}

function postorder(node, result = []) {
    if (node) {
        postorder(node.left, result);
        postorder(node.right, result);
        result.push(node.value);
    }
    return result;
}

// Event Listeners
insertNodeBtn.addEventListener('click', () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        insert(value);
        nodeValueInput.value = '';
    } else {
        alert("Enter a valid number!");
    }
});

inorderBtn.addEventListener('click', () => {
    traversalResult.textContent = "Inorder: " + inorder(root).join(" → ");
});

preorderBtn.addEventListener('click', () => {
    traversalResult.textContent = "Preorder: " + preorder(root).join(" → ");
});

postorderBtn.addEventListener('click', () => {
    traversalResult.textContent = "Postorder: " + postorder(root).join(" → ");
});

resetBtn.addEventListener('click', () => {
    root = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    traversalResult.textContent = "Click a traversal to see output.";
});
