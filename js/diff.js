//都道府県リストを取得
function diff(){
	$.ajax({
		url: "https://opendata.resas-portal.go.jp/api/v1/prefectures",
		type: "GET",
		headers: {
			"X-API-KEY": "aopG1WDpGAaaMtOYfNQ3hiJbpbkWOgcBXVum3Etb"
		},
		async: "false",
		success: function(result_data) {
			console.log(result_data);
		}
	});
}

diff();
