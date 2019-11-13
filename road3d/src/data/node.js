const fs = require('fs');

let road = JSON.parse(fs.readFileSync('./shenhai.json', 'UTF-8'));
// const paths = road.paths;
// const hotData = road.hotData;

// let npaths = [];
// for (let i = 0; i < paths.length; i+=4) {
//     if (!paths[i+2]) {
//         npaths.push([paths[i], paths[i+1]]);
//         continue;
//     }
//     if (paths[i+1][0] === paths[i+2][0] && paths[i+1][1] === paths[i+2][1]) {
//         npaths.push([paths[i], paths[i+1], paths[i+3]]);
//     } else {
//         npaths.push([paths[i], paths[i+1], paths[i+2], paths[i+3]]);
//     }
// }

// let nhot = [];
// for (let i = 0; i < hotData.length; i++) {
//     const hot = hotData[i];
//     if (~~hot[0] > 35) {
//         break;
//     }
//     nhot.push(hot);
// }

// let ouput = {
//     paths: npaths,
//     hotData: nhot
// }

// console.log(npaths.length)

// fs.writeFileSync('beltLink.json', JSON.stringify(ouput), err => {throw err;});

var result = "";
for (let i = 0; i < road.length; i++) {
    const link = road[i];
    if (i!==0) {
        result += ','
    }
    result += link.loc;
}
fs.writeFileSync('link.json', result, err => {throw err;});