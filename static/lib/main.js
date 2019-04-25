$(window).on('action:composer.loaded', function (ev, data) {
	$('[data-format="statgrid"]').hide();
	if (data.composerData.action === 'posts.reply' || data.composerData.action === 'topics.post') {
		$('[data-format="statgrid"]').show();
		$(`<div id="statgrid-field" style="display:none">
	<div id="grid-type">
	   <select>
		  <option value="nothing">Nothing</option>
		  <option value="three-grid">3d6</option>
		  <option value="four-grid">4d6d1</option>
	   </select>
	</div>
 </div>`).insertBefore('.category-tag-row');
	}
	else if (data.composerData.statGrid) {
		var content = '';
		if (data.composerData.statGrid) {
      content = `<div class="grid-results">`;
      for (var i = 0; i < 6; i++) {
        content += `<tr>`;
        for (var j = 0; j < 6; j++) {
          content += `<td style="border:1px solid; padding:10px">${data.composerData.statGrid.results[i][j]}</td>`;
        }
        content += `</tr>`;
      }
      content += '</div>';
		}
		$(content).insertBefore('.category-tag-row');
	}
});

$(document).on('click', '[data-format="statgrid"]', function () {
	$('#statgrid-field').toggle();
});

$(window).on('action:composer.submit', function (ev, data) {
	const numberField = data.composerEl.find('#statgrid-field');
	const type = numberField.find('#grid-type select').val();
	if (type === 'three-grid') {
		data.composerData.statGrid = "three-grid";
  } 
  if (type === 'four-grid') {
    data.composerData.statGrid = "four-grid";
  }
});

$(document).on('change', '[id="grid-type"]', function (e) {
	const selected = e.target.options[e.target.selectedIndex].value;
});
