//mapを定義
var pmap;
var smap;
var marker;

//ジオコーディング
function geocording(index, address, map) {
  var geocoder = new Y.GeoCoder();
  var request = { query : address };
  geocoder.execute( request , function( ydf_data ) {
    if ( ydf_data.features.length > 0 ) {
      var latlng = ydf_data.features[0].latlng;
      var name = ydf_data.features[0].name;
      var lat = latlng.lat();
      var lng = latlng.lng();
			pin(index, name, lat, lng, map);
    }
  } );
}

//ピンを立てる
function pin(index, name, lat, lng, map){
	marker = new Y.Marker(new Y.LatLng(lat, lng));
  setEvent(index, marker, name);
 	map.addFeature(marker);
}

// 要素をHTMLに追加
function addElement(type, names){
  for (var i = 0; i < names.length; i++) {
    name = names[i];
    if ( name.match(/郡/) ) {
      // nameに郡を含む場合，郡より前部分を削除
      var cut_index = name.indexOf('郡');
      var newname = name.slice(cut_index+1);
    } else {
      // 和歌山県を削除（市区町村名だけにする）
      var newname = name.slice(cut_index+1);
    }

    // 挿入する要素の用意
    var index = type + i;
    var insert = '<li id="'+ index +'">'+ (i+1) + '．' + newname +'</li>';

    if ( index.match(/s/) ) {
      // indexにsを含む場合の処理
      $('#secret_list').append(insert);
    } else if ( index.match(/p/) ) {
      // indexにpを含む場合の処理
      $('#popular_list').append(insert);
    }
  }
}

// イベント設定
function setEvent(index, marker, name){
  marker.bind("click", function(){
    // 色のクリア用
    $('#secret_list').children().css({'color':'#6c7279','background-color':'#fff'});
    $('#popular_list').children().css({'color':'#6c7279','background-color':'#fff'});

    // 色を変える
    $('#'+index).css({'color':'white','background-color':'#FE2E2E'});
  });
}

function pre_drow(prefcode){
  $.ajax({
      url:"https://opendata.resas-portal.go.jp/api/v1/prefectures",
      type: "GET",
      headers: {
          "X-API-KEY": "3Hdy8PnC1g6a0V3HhR2rsoKeLNgZmKh3zi6qomEJ"
      },
      async: "false",
      dataType: "json",
      success: function(data, dataType) {
        for(var i=0;i<data['result'].length;i++){
          if(data['result'][i]['prefCode']==prefcode){
            pref_get(data['result'][i]['prefName'],prefcode);
            break;
          }else{
            continue;
          }
        }
      }
    });
}

function pref_get(address,prefcode) {
  var geocoder = new Y.GeoCoder();
  var request = { query : address };
  geocoder.execute( request , function( ydf_data ) {
    if ( ydf_data.features.length > 0 ) {
      var latlng = ydf_data.features[0].latlng;
      var lat = latlng.lat();
      var lng = latlng.lng();
      drow(lat,lng,prefcode);
    }
  });
}

//マップの描画
function drow(lat,lng,prefcode){
  // Listの初期化
  $('#secret_list').html('');
  $('#popular_list').html('');

  // 一個目の地図
  pmap = new Y.Map("popular_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var pcontrol = new Y.SliderZoomControlVertical();
  pmap.addControl(pcontrol);
  pmap.drawMap(new Y.LatLng(lat, lng), 10, Y.LayerSetId.NORMAL);

  // 二個目の地図
  smap = new Y.Map("secret_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var scontrol = new Y.SliderZoomControlVertical();
  smap.addControl(scontrol);
  smap.drawMap(new Y.LatLng(lat, lng), 10, Y.LayerSetId.NORMAL);
  citycode_get(prefcode);
}

function set_spot(obj){
  //smap
  var secret_spot = obj.secret;
  addElement('s', secret_spot);
  for(var i=0;i<secret_spot.length;i++){
    // 引数sidを追加
    var sid = 's'+ i;
    geocording(sid, secret_spot[i], smap);
  }
  //pmap
  var popular_spot = obj.popular;
  addElement('p', popular_spot);
  for(var i=0;i<popular_spot.length;i++){
    // 引数pidを追加
    var pid = 'p'+ i;
    geocording(pid, popular_spot[i], pmap);
  }
}
