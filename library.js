"use strict";

const dieRoll = () => {
  return Math.floor((Math.random() * 6) + 1);
}

const gg = (type) => {
  console.log('making a grid of type ' + type);
  let grid = { 
    results: [
      [],
      [],
      [],
      [],
      [],
      []
    ]
  };
  if (type === 'three-grid') {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        let result = dieRoll() + dieRoll() + dieRoll();
        grid.results[i].push(result);
      }
    }
  } else if (type === "four-grid") {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        let rolls = [];
        for (var k = 0; k < 4; k++) {
          rolls.push(dieRoll());
        }
        let sorted = rolls.sort((a,b) => b - a);
        let result = sorted[0] + sorted[1] + sorted[2];
        grid.results[i].push(result);
      }
    } 
  }
}

const gf = (grid) => {
  content = `<div class="grid-results"><table>`;
  for (var i = 0; i < 6; i++) {
    content += `<tr>`;
    for (var j = 0; j < 6; j++) {
      let results = !!grid.results ? !!grid.results[i] ? grid.results[i][j] : 0 : 0;
      content += `<td style="border:1px solid">${results}</td>`;
    }
    content += `</tr>`;
  }
  content += '</table></div>';
}

const composerFormatting = (data, callback) => {
  data.options.push({
    name: 'statgrid',
    className: 'fas fa-hat-wizard',
    title: 'Stat Grid'
  });
  callback(null, data);
};
module.exports.composerFormatting = composerFormatting;

const parsePost = (data, callback) => {
  if (data.postData.statGrid) {
    console.log('formatting grid:');
    console.log(data.postData.statGrid);
    data.postData.content = `${data.postData.content} <br> <div class="stat-grid">${gf(data.postData.statGrid)}</div>`
  }
  callback(null, data);
};
module.exports.parsePost = parsePost;

var posts = module.parent.require('./posts');

const buildComposer = async (data, callback) => {
  var req = data.req;
  if (req && req.query.pid) {
    let postData;
    console.log('getting post data');
    await posts.getPostData(req.query.pid, (e, p) => {e ? console.log(e) : postData = p});
    console.log('got post data');
    console.log(postData);
    data.templateData = { ...data.templateData, statGrid: postData.statGrid };
  }
  callback(null, data);
};
module.exports.buildComposer = buildComposer;

const generateGrid = (data, callback) => {
  if (data.data.statGrid && data.post) {
    console.log('generating grid');
    data.post.statGrid = gg(data.data.statGrid);
    console.log('generated grid:')
    console.log(data.post.statGrid);
  }
  callback(null, data);
};
module.exports.generateGrid = generateGrid;