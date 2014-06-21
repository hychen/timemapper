// Generated by LiveScript 1.2.0
var out$ = typeof exports != 'undefined' && exports || this;
out$.avaliableTitles = avaliableTitles;
function avaliableTitles(url, done){
  var get, result;
  get = function(node, q){
    return $(node).children(q);
  };
  result = {
    count: 0,
    tiles: {}
  };
  return $.ajax({
    type: 'GET',
    dataType: 'xml',
    url: url,
    success: function(xml){
      var layers;
      layers = $(xml).find('Layer');
      layers.each(function(idx){
        var id, name, format, url;
        id = get(this, "ows\\:Identifier").text();
        name = get(this, "ows\\:Title").text();
        format = get(this, 'Format').text().replace('image/', '');
        url = get(this, 'ResourceURL').attr('template');
        return result['tiles'][id] = {
          name: name,
          format: format,
          url: url
        };
      });
      result.count = layers.length;
      return done(result);
    }
  });
}