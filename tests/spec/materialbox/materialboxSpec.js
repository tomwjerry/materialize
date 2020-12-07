describe( 'Materialbox:', function() {
  let transformMaterialbox;

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
        let overlay = transformMaterialbox.querySelector('#materialbox-overlay');
        let overlayRect = overlay.getBoundingClientRect();
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        expect(overlay).toBeTruthy('because it is generated on init'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(overlay).toBeVisible('because materialbox was clicked'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(overlayRect.top).toEqual(0);
        expect(overlayRect.left).toEqual(0);
        expect(overlayRect.width).toEqual(windowWidth);
        expect(overlayRect.height).toEqual(windowHeight);

        done();
      }, 1000);
    });
  });

});
