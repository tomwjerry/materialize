jasmine.getFixtures().fixturesPath = 'http://localhost:9001/tests/spec';

// var fixturesCache = {};
// var containerId = 'jasmine-fixtures';
// function loadFixtures() {
//     //should save and restore the body element, not just the container
//     var container = document.getElementById(containerId);
//     if (container) {
//         container.parentNode.removeChild(container);
//     }
//     var htmlChunks = [];

//     var fixtureUrls = arguments;
//     for (var urlCount = fixtureUrls.length, urlIndex = 0; urlIndex < urlCount; urlIndex++) {
//         url = fixtureUrls[urlIndex];
//         if (void (0) === fixturesCache[url]) {
//             var xhr = new window.XMLHttpRequest;
//             xhr.open('GET', url, false);
//             xhr.send(null);
//             var status = xhr.status;
//             var succeeded = 0 === status || (status >= 200 && status < 300) || 304 == status;

//             if (!succeeded)
//                 throw new Error('Failed to load resource: status=' + status + ' url=' + url);
//             fixturesCache[url] = xhr.responseText;
//         }
//         htmlChunks.push(fixturesCache[url]);
//     }
//     html = htmlChunks.join('');
//     var container = document.createElement('div');
//     container.id = this.containerId;

//     if (html && html.nodeType === 1)
//         container.appendChild(html);
//     else
//         container.innerHTML = html;

//     document.body.appendChild(container);

// }


beforeEach(function() {

  /**
   * Creates standard click event on DOM element
   */
  window.click = function(elem) {
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    elem.dispatchEvent(evt);
  };

  window.mouseenter = function(el) {
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "mouseenter",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
  };

  window.keydown = function(el, keycode) {
    var ev = document.createEvent("Events");
    ev.initEvent("keydown", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.keyup = function(el, keycode) {
    var ev = document.createEvent("Events");
    ev.initEvent("keyup", true, true);

    ev.keyCode = keycode;
    ev.which = keycode;

    el.dispatchEvent(ev);
  }

  window.focus = function(el) {
    var ev = document.createEvent("Events");
    ev.initEvent("focus", true, true);
    el.dispatchEvent(ev);
  }
});
