"use strict";

const DiceRoll = require('rolldice');

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
        let dice = new DiceRoll('3d6');
        let result = dice.expression.result;
        grid[i].push(result);
      }
    }
  } else if (type === "four-grid") {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        let dice = new DiceRoll('4d6d1');
        let result = dice.expression.result;
        grid[i].push(result);
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
    await posts.getPostData(req.query.pid, (e, p) => {e ? console.log(e) : postData = p});
    data.templateData = { ...data.templateData, statGrid: postData.statGrid };
  }
  callback(null, data);
};
module.exports.buildComposer = buildComposer;

const generateGrid = (data, callback) => {
  if (data.data.statGrid && data.post) {
    data.post.statGrid = gg(data.data.statGrid);
  }
  callback(null, data);
};
module.exports.generateGrid = generateGrid;