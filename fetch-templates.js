var FetchTemplates = async function() {			
	var promises = [];
	var templates = [];

	var fx = function(html) {
		promises.push(
			new Promise(async function(resolve, reject) {
				try {
					var result = await fetch(`${html}.html`);
					var text = await result.text();
					templates[html] = Hogan.compile(text);

					resolve();
				} catch( err) {
					reject(err);
				}
			})
		);
	}

	for (var i = 0; i < arguments.length; i++) {
		var html = arguments[i];
		fx(html);
	}

	await Promise.all(promises);
	return templates;
}