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
  //穴場と有名スポットの取得
  var obj = getinfo();
  // 一個目の地図
  var pmap = new Y.Map("popular_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var pcontrol = new Y.SliderZoomControlVertical();
  pmap.addControl(pcontrol);
  pmap.drawMap(new Y.LatLng(33.9292, 135.4770), 10, Y.LayerSetId.NORMAL);
  var secret_spot = obj.secret;
  for(var i=0;i<secret_spot.length;i++){
    geocording(secret_spot[i], pmap);
  }

  // 二個目の地図
  var smap = new Y.Map("secret_map", {
      configure : {
          scrollWheelZoom : true,
          dragging : true
      }
  });
  var scontrol = new Y.SliderZoomControlVertical();
  smap.addControl(scontrol);
  smap.drawMap(new Y.LatLng(33.9292, 135.4770), 10, Y.LayerSetId.NORMAL);
  var popular_spot = obj.popular;
  for(var i=0;i<popular_spot.length;i++){
    geocording(popular_spot[i], smap);
  }
}

//穴場と有名どころの取得
function getinfo(){
  var obj ={
    secret: ["和歌山県白浜町","和歌山県海南市","和歌山県田辺市","和歌山県太地町","和歌山県岩出市"],
    popular: ["和歌山県紀の川市","和歌山県和歌山市","和歌山県新宮市","和歌山県みなべ町","和歌山県串本町"]
  };
  return obj;
}
