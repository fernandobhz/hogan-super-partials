var FetchJsons = async function() {			
	var promises = [];
	var jsons = {};

	var fx = function(json) {
		promises.push(
			new Promise(async function(resolve, reject) {
				try {
					var result = await fetch(`${json}.json`);
					var obj = await result.json();
					jsons[json] = obj;

					resolve();
				} catch( err) {
					reject(err);
				}
			})
		);
	}

	for (var i = 0; i < arguments.length; i++) {
		var json = arguments[i];
		fx(json);
	}

	await Promise.all(promises);
	return jsons;
}