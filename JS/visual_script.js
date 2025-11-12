
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

    class Node {
      constructor(value, x, y) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = x;
        this.y = y;
      }
    }

    let root = null;

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
        if (!node.left) node.left = new Node(value, x - offset, y + 80);
        else insertRec(node.left, value, x - offset, y + 80, offset / 2);
      } else if (value > node.value) {
        if (!node.right) node.right = new Node(value, x + offset, y + 80);
        else insertRec(node.right, value, x + offset, y + 80, offset / 2);
      } else {
        alert("Duplicate values not allowed in BST!");
      }
    }

    function drawTree() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNode(root);
    }

    function drawNode(node) {
      if (!node) return;
      if (node.left) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.left.x, node.left.y);
        ctx.stroke();
        drawNode(node.left);
      }
      if (node.right) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.right.x, node.right.y);
        ctx.stroke();
        drawNode(node.right);
      }
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
    }

    function inorder(node, arr = []) {
      if (node) {
        inorder(node.left, arr);
        arr.push(node);
        inorder(node.right, arr);
      }
      return arr;
    }

    function preorder(node, arr = []) {
      if (node) {
        arr.push(node);
        preorder(node.left, arr);
        preorder(node.right, arr);
      }
      return arr;
    }

    function postorder(node, arr = []) {
      if (node) {
        postorder(node.left, arr);
        postorder(node.right, arr);
        arr.push(node);
      }
      return arr;
    }

    
    insertNodeBtn.addEventListener('click', () => {
      const value = parseInt(nodeValueInput.value);
      if (!isNaN(value)) {
        insert(value);
        nodeValueInput.value = '';
      } else {
        alert("Enter a valid number!");
      }
    });

    inorderBtn.addEventListener('click', () => highlightTraversal(inorder(root)));
    preorderBtn.addEventListener('click', () => highlightTraversal(preorder(root)));
    postorderBtn.addEventListener('click', () => highlightTraversal(postorder(root)));

    resetBtn.addEventListener('click', () => {
      root = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      traversalResult.textContent = "Click a traversal to see output.";
    });

    function highlightTraversal(nodes) {
      let i = 0;
      const sequence = [];
      const interval = setInterval(() => {
        if (i >= nodes.length) {
          clearInterval(interval);
          traversalResult.textContent = "Traversal: " + sequence.join(" → ");
          return;
        }
        drawTree();
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000";
        ctx.fillText(nodes[i].value, nodes[i].x, nodes[i].y);
        sequence.push(nodes[i].value);
        i++;
      }, 800);
    }



  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
  });

  // Optional: close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
    });
  });

