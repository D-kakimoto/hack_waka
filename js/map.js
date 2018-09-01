function geocording(address) {
  var geocoder = new Y.GeoCoder();
  var request = { query : address };

  geocoder.execute( request , function( ydf_data ) {
    if ( ydf_data.features.length > 0 ) {
      var latlng = ydf_data.features[0].latlng;

      console.log("名称 : "+ ydf_data.features[0].name);
      console.log("緯度 : "+ latlng.lat());
      console.log("経度 : "+ latlng.lng());
    }
  } );
}

window.onload = function(){

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

  var address = "和歌山県白浜町";
  geocording(address);



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

}
