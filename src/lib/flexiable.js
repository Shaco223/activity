export default {
  install () {
    var calc = () => {
      var deviceWidth = document.documentElement.clientWidth;

      // if (deviceWidth > 500) deviceWidth = 500
      document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
      document.documentElement.setAttribute('dpr', window.devicePixelRatio);

      // 解决部分rem特别大的问题
      var docElFontSize = document.documentElement.style.fontSize.replace(/px/gi, '')
      var computedFontSize = window.getComputedStyle(document.documentElement)['font-size'].replace(/px/gi, '')
      docElFontSize != computedFontSize && (document.documentElement.style.fontSize = docElFontSize * docElFontSize / computedFontSize + 'px')
    };

    window.addEventListener('resize', calc);
    calc();
  }
};
