//都道府県リストを取得
var cities = [];
var diff_secpop = [];

//市町村コードを取得
function citycode_get(prefcode){
  $.ajax({
      url:"https://opendata.resas-portal.go.jp/api/v1/cities?prefCode="+prefcode,
      type: "GET",
      headers: {
          "X-API-KEY": "3Hdy8PnC1g6a0V3HhR2rsoKeLNgZmKh3zi6qomEJ"
      },
      async: "false",
      dataType: "json",
      success: function(data, dataType) {
        for(var i=0;i<data['result'].length;i++){
          cities.push(data['result'][i]['cityCode']);
        }
        for (key in cities) {
          diff(cities[key],prefcode);
        }
      }
    });
}

function diff(citycode,prefcode){
    var in_pre_num = null;
    var all_pre_num = null;
    var in_city_num = null;
    var kenngai = null;
    var kennnai = null;
    var result = null;
    var cityname;
    var prefname;
    var year = "2016";
    $.ajax({
        url:"https://opendata.resas-portal.go.jp/api/v1/partner/docomo/destination?year="+year+"&month=01&periodOfDay=1&periodOfTime=14&gender=-&ageRange=-&prefCodeDestination="+prefcode+"&cityCodeDestination="+citycode+"&prefCodeResidence=-&cityCodeResidence=-",
        type: "GET",
        headers: {
            "X-API-KEY": "3Hdy8PnC1g6a0V3HhR2rsoKeLNgZmKh3zi6qomEJ"
        },
        async: "false",
        dataType: "json",
        success: function(data, dataType) {
          all_pre_num = data["result"]["total"];
          //県外人数のチェック
          for (var i=0;i<47;i++) {
            if (data["result"]["prefs"][i]["prefCode"] == prefcode) {
              prefname = data["result"]["prefs"][i]["prefName"];
              for (var v=0;v<100;v++) {
                if(!data["result"]["prefs"][i]["cities"][v]){continue;}
                if(data["result"]["prefs"][i]["cities"][v]["cityCode"] == citycode){
                  in_city_num = data["result"]["prefs"][i]["cities"][v]['total'];
                  cityname = data["result"]["prefs"][i]["cities"][v]["cityName"];
                  break;
                }else{
                  continue;
                }
              }
              in_pre_num = data["result"]["prefs"][i]["total"];
              kenngai = all_pre_num - in_pre_num;
              kennnai = all_pre_num - in_city_num - kenngai;
              result = (kennnai - kenngai)/all_pre_num;
              var prefcity = prefname + cityname;
              console.log(citycode+","+prefname+cityname+",県外"+kenngai+",県内"+kennnai+",差分"+result);
              var obj = {};
              obj['name'] = prefcity;
              obj['diff'] = result;
              diff_secpop.push(obj);
              break;
            }else{
              continue;
            }
          }
        }
    });
}

//ajaxが終わったらソート
$(document).ajaxStop(function() {
  var popular_spot = [];
  var secret_spot = [];
  diff_secpop.sort(function(a,b){
    if(a.diff<b.diff) return -1;
    if(a.diff > b.diff) return 1;
    return 0;
  });
  for(var i=0;i<5;i++){
    popular_spot.push(diff_secpop[i]['name']);
  }
  for(var i=diff_secpop.length-1;i>diff_secpop.length-6;i--){
    secret_spot.push(diff_secpop[i]['name']);
  }
  var obj = {};
  obj['secret'] = secret_spot;
  obj['popular'] = popular_spot;
  set_spot(obj);
  console.log(obj);
});

$("#pref-selecter").change(function(e){
  var target = $(e.target);
  cities = [];
  diff_secpop = [];
  pre_drow(target[0].value);
});

pre_drow(30);
