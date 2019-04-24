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
          content += `<td>${data.composerData.statGrid.results[i][j]}`;
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

// $(window).on('action:composer.submit', function (ev, data) {
// 	const numberField = data.composerEl.find('#statgrid-field');
// 	const type = numberField.find('#grid-type select').val();
// 	const validNumber = function (num, greaterThanZero = true) {
// 		if (num && num.indexOf(".") == -1 && (greaterThanZero ? num > 0 : num >= 0)) {
// 			return num;
// 		}
// 		return undefined;
// 	};
// 	if (type === 'roll-dice') {
// 		const diceAmount = validNumber(numberField.find('#dice .dice-amount').val()) || numberField.find('#dice .dice-amount').attr('placeholder');
// 		const diceRequest = diceAmount + numberField.find('#dice .dice-type').val();
// 		data.composerData.diceRoll = diceRequest;
// 	}
// 	if (type === 'random-number') {
// 		const randomAmount = validNumber(numberField.find('#random .random-amount').val()) || numberField.find('#random .random-amount').attr('placeholder');
// 		const randomMin = validNumber(numberField.find('#random .random-min').val(), false) || numberField.find('#random .random-min').attr('placeholder');
// 		const randomMax = validNumber(numberField.find('#random .random-max').val()) || numberField.find('#random .random-max').attr('placeholder');
// 		data.composerData.randomNumber = [randomAmount, randomMin, randomMax];
// 	}
// });

// $(document).on('change', '[id="grid-type"]', function (e) {
// 	const selected = e.target.options[e.target.selectedIndex].value;
// 	if (selected === 'roll-dice') {
// 		$('#random').hide();
// 		$('#dice').show();
// 	}
// 	else if (selected === 'random-number') {
// 		$('#dice').hide();
// 		$('#random').show();
// 	}
// 	else {
// 		$('#random').hide();
// 		$('#dice').hide();
// 	}
// });

