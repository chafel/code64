$(document).ready( function () {
  function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  function run64(type) {
    var v = $('#input').val();

    if (v === '') {
      alert('Please input something')
    } else {
      var output = $('#output');
      if (type === 'encode') {
        output.text(b64EncodeUnicode(v));
      } else if (type === 'decode') {
        output.text(b64DecodeUnicode(v));
      }
    }
  }

  $('#decode').click(function () {run64('decode')});
  $('#encode').click(function () {run64('encode')});
});