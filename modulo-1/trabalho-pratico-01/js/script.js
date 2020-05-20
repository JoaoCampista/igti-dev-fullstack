window.addEventListener('load', start);

function start() {
  document.body.onclick = function () {
    var range = event.target;

    switch (range.id) {
      case 'redRange':
        var colorValue = document.getElementById('redValue');
        break;
      case 'greenRange':
        var colorValue = document.getElementById('greenValue');
        break;
      case 'blueRange':
        var colorValue = document.getElementById('blueValue');
        break;
      default:
        colorValue = false;
    }

    if (colorValue) {
      function updateColorValue() {
        colorValue.innerHTML = range.value;
        var colorContent = document.querySelectorAll('.colorContent');
        changeColorBox(colorContent);
      }
      function changeColorBox(colorContent) {
        function changeColorBackground(r, g, b) {
          switch (range.id) {
            case 'redRange':
              var colorBackground = [r, 0, 0];
              break;
            case 'greenRange':
              var colorBackground = [0, g, 0];
              break;
            case 'blueRange':
              var colorBackground = [0, 0, b];
              break;
            default:
              colorValue = false;
          }
          range.style.background = 'rgb(' + colorBackground.join(',') + ')';
        }
        r = colorContent[0].textContent;
        g = colorContent[1].textContent;
        b = colorContent[2].textContent;

        colorBox.style.backgroundColor = 'rgb(' + [r, g, b].join(',') + ')';
        document.getElementById('myName').style.color =
          'rgb(' + [r, g, b].join(',') + ')';
        changeColorBackground(r, g, b);
      }

      colorValue.innerHTML = range.value;
      range.addEventListener('input', updateColorValue);
    }
  };
}
