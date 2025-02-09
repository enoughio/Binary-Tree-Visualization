function Node(value, left, right, parent = "", children = []) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;
}


// actual tree creater function
function createTree(arr) {
    for (var i = 1; i < arr.length; i++) { 
                                         // deciding node direction through an array(tree) 
                                          // which only contins data value at this movement.
        nodeDirection(arr[0], arr[i])      
    }

    createData(arr[0]);
    remove();
    
    try {  
        drawGraph(arr);  /// go for drawinng the graph
    } catch {
        console.log("No Input");
    }

}


// i have no idea what this  is doing----------------
function remove() {  // ?
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph) };

}


// defining node direction and takinng note of whether its left and right hands
function nodeDirection(root, node) { 
    var a = Number(node.value)
    var b = Number(root.value)

    // if data is lesser then parent data node then left direction   // data < root.data
    if (a < b) {
        if (root.left == null) { //if leaf node
            root.left = node;
            node.isLeft = true;
        } else {   // else go for lower nodes node
            nodeDirection(root.left, node);
        }
    } else if (a > b) {
        if (root.right == null) {
            root.right = node;
            node.isRight = true
        } else {
            nodeDirection(root.right, node);
        }
    }
}

 // 
function createData(node) { 

    if (node == null) { return }

    if (node.left) {    
                        
        node.children.push(node.left);          // if node left child exist then push it then store it as child 
        node.left.parent = node;             // and asign node as its parent. 
        
        if(!node.right){    // if right child does not exist then create one empty child
            let newNode = new Node("Empty",null,null)
            newNode.isRight = true
            node.children.push(newNode);        // if node left child exist then push it then store it as child 
            newNode.parent = node                // and asign node as its parent. 
        
        }
    }

        // ~same for right
    if (node.right) {
        node.children.push(node.right);
        node.right.parent = node;
        if(!node.left){
            let newNode = new Node("Empty",null,null)
            newNode.isLeft = true
            node.children.unshift(newNode);
            newNode.parent = node
        }
    }

    createData(node.left);
    createData(node.right);

}

// creates new node (which only contains data at this point) and returns root to index.js file
function createNodes(list) {
    new_list = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == "") { continue }
        new_list.push(new Node(list[i], null, null));

    }

    createTree(new_list)


    //adding locking fuctionality
    if (new_list.length != 0) {
        document.querySelector(".btn").disabled = false
    } else {
        document.querySelector(".btn").disabled = true
    }

    return new_list // gives root node  to getRoot function in inndex.js
 }