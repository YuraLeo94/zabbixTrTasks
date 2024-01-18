/*
    Algorithm
    a = 4, b = 3, c = 2.
    ***Graph solution***
    1. Initialise a queue to implement Breadth First Search (BFS).
    2. Since, initially, both the jugs are empty, insert the state {0, 0} into the queue.
    3. Perform the following state, till the queue becomes empty ->
        3.1 Pop out the first element of the queue.
        3.2 If the value of popped element is equal to TARGET ('c'), return passed Steps.
        3.3 Vessel1_left and Vessel2_left - amount of water left in the vessels.
        3.4 Fill operation ->
            3.4.1 Add {Vessel1_left, B} to the hash map if it doesn't exist there.
            3.4.2 Add {A, Vessel2_left} to the hash map if it doesn't exist there.
        3.5 Empty operation ->
            3.5.1 Add {Vessel1_left, 0} to the hash map if it doesn't exist there.
            3.5.2 Add {A, Vessel2_left} to the hash map if it doesn't exist there.
        3.6 Transfer of water operation ->
            3.6.1 Calculate how much can be transferred from Vessel1_left to Vessel2_left. difference = B - Vessel2_left;
                3.6.1.1 Check whether there will be a remainder after the transfusion or not. Vessel1_left >= difference;
                    3.6.1.1.1.1 If yes, calculate how much the remainder will be. remainder = Vessel1_left - difference;
                    And add {Remainder, B} to the hash map if it doesn't exist there.
                    3.6.1.1.1.2 If no, calculate how much can move from Vessel2_left to Vessel1_left. transfered Water = Vessel1_left + Vessel2_left;
                    And add {0, Trasfered Water} to the hash map if it doesn't exist there.   
            3.6.2 Calculate how much can be transferred from Vessel2_left to Vessel1_left. difference = A - Vessel1_left;
                3.6.2.1 Check whether there will be a remainder after the transfusion or not. Vessel2_left >= difference;
                    3.6.2.1.1.1 If yes, calculate how much the remainder will be. remainder = Vessel2_left - difference;
                    And add {A, Remainder} to the hash map if it doesn't exist there.
                    3.6.2.1.1.2 If no, calculate how much can move from Vessel2_left to Vessel1_left. transfered Water = Vessel1_left + Vessel2_left;
                    And add {Trasfered Water, 0} to the hash map if it doesn't exist there.
    4. Return -1, since, it is not possible to measure TARGET ('c') litres.   
*/

class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
}

function countSteps(mp, u, needPrintPath) {
    let steps = 1;
    if (u.first === 0 && u.second === 0) {
        needPrintPath && console.log(0, 0);
        return steps;
    }
    steps += countSteps(mp, mp.get(u.first + "," + u.second), needPrintPath);
    needPrintPath && console.log(u.first, u.second);
    return steps;
}

function BFS(a, b, target, needPrintPath) {
    const hashMap = new Map();
    let hasSolution = false;
    const hashMapPath = new Map();

    const queue = [];
    queue.push(new Pair(0, 0));

    let steps = 0;

    function addNode(a, b, unvisitedNode) {
        if (!hashMap.has(a + "," + b)) {
            queue.push(new Pair(a, b));
            hashMapPath.set(a + "," + b, unvisitedNode);
        }
    }

    while (queue.length > 0) {
        const unvisitedNode = queue.shift();

        hashMap.set(unvisitedNode.first + "," + unvisitedNode.second, null); // #Q for what is it this?

        if (unvisitedNode.first === target || unvisitedNode.second === target) {
            hasSolution = true;
            steps = countSteps(hashMapPath, unvisitedNode, needPrintPath);
            return steps;
        }

        addNode(unvisitedNode.first, b, unvisitedNode);
        addNode(a, unvisitedNode.second, unvisitedNode);

        let d = b - unvisitedNode.second;
        if (unvisitedNode.first >= d) {
            let r = unvisitedNode.first - d;
            addNode(r, b, unvisitedNode);
        } else {
            let tw = unvisitedNode.first + unvisitedNode.second;
            addNode(0, tw, unvisitedNode);
        }

        d = a - unvisitedNode.first;
        if (unvisitedNode.second >= d) {
            let r = unvisitedNode.second - d;
            addNode(a, r, unvisitedNode);
        } else {
            let tw = unvisitedNode.first + unvisitedNode.second;
            addNode(tw, 0, unvisitedNode);
        }

        addNode(unvisitedNode.first, 0, unvisitedNode);
        addNode(0,  unvisitedNode.second, unvisitedNode);
    }

    if (!hasSolution)
        return -1;

}

function pouringWater(a, b, c) {
    console.log(`Value ${a}, ${b}, ${c}`);
    if (c === a || c === b) { return console.log('Steps 1') }

    console.log('Steps', BFS(a, b, c));
}

pouringWater(4, 3, 2);
pouringWater(5, 3, 4);
pouringWater(5, 4, 4);
pouringWater(3, 5, 4);
pouringWater(2, 7, 5);
pouringWater(2, 3, 4); // no
pouringWater(2, 8, 5); // no
