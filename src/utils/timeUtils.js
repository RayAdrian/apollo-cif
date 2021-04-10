export const hmsToSecondsOnly = str => {
  var p = str.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
};

export const timeToHMS = currentTime => {
  var minutes = '0' + Math.floor(currentTime / 60);
  var seconds = '0' + (currentTime - minutes * 60);
  var cur = minutes.substr(-2) + ':' + seconds.substr(-2);

  return cur;
};