"use strict";

const dieRoll = () => {
  return Math.floor((Math.random() * 6) + 1);
}

const gg = (type) => {
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
        grid[i].push(result);
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
      content += `<td style="border:1px solid">${grid.results[i][j]}</td>`;
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