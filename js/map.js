//mapを定義
var pmap;
var smap;

//ジオコーディング
function geocording(address, pmap) {
  var geocoder = new Y.GeoCoder();
  var request = { query : address };
  geocoder.execute( request , function( ydf_data ) {
    if ( ydf_data.features.length > 0 ) {
      var latlng = ydf_data.features[0].latlng;
      var lat = latlng.lat();
      var lng = latlng.lng();
			pin(ydf_data.features[0].name,lat,lng,pmap);
    }
  } );

}

//ピンを立てる
function pin(name,lat,lng,pmap){
	var pmarker = new Y.Marker(new Y.LatLng(lat, lng));
  pmarker.bind("click", function(){
    alert("ueeeeeeeeeeeei!!!");
  });
	pmap.addFeature(pmarker);
}

//マップの描画
window.onload = function(){
  // 一個目の地図
  pmap = new Y.Map("popular_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var pcontrol = new Y.SliderZoomControlVertical();
  pmap.addControl(pcontrol);
  pmap.drawMap(new Y.LatLng(33.9292, 135.4770), 10, Y.LayerSetId.NORMAL);

  // 二個目の地図
  smap = new Y.Map("secret_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var scontrol = new Y.SliderZoomControlVertical();
  smap.addControl(scontrol);
  smap.drawMap(new Y.LatLng(33.9292, 135.4770), 10, Y.LayerSetId.NORMAL);
}

function set_spot(obj){
  //smap
  var secret_spot = obj.secret;
  for(var i=0;i<secret_spot.length;i++){
    geocording(secret_spot[i], pmap);
  }
  //pmap
  var popular_spot = obj.popular;
  for(var i=0;i<popular_spot.length;i++){
    geocording(popular_spot[i], smap);
  }
}
