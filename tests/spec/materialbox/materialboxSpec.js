describe( 'Materialbox:', function() {
  var transformMaterialbox;

  beforeEach(async function() {
    await XloadFixtures(['materialbox/materialboxFixture.html']);
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe('Materialbox opens correctly with transformed ancestor', function() {
    it('Opens a correctly placed overlay when clicked', function(done) {
      transformMaterialbox = document.querySelector('#transformTest');
      M.Materialbox.init(document.querySelector('.materialboxed'));

      // Mouse click
      click(transformMaterialbox.querySelector('.materialboxed'));
      setTimeout(function() {
        // Check overlay is attached
        var overlay = transformMaterialbox.querySelector('#materialbox-overlay');
        var overlayRect = overlay.getBoundingClientRect();
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var overlayStyle = getComputedStyle(overlay);
        expect(overlay).toBeTruthy('because it is generated on init'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(overlayStyle.getPropertyValue('display')).toEqual('block', 'because materialbox was clicked'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(overlayRect.top).toEqual(0);
        expect(overlayRect.left).toEqual(0);
        expect(overlayRect.width).toEqual(windowWidth);
        expect(overlayRect.height).toEqual(windowHeight);

        done();
      }, 1000);
    });
  });

});
