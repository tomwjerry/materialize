describe("Fab", function () {

  beforeEach(async function() {
    await XloadFixtures(['fab/fabFixture.html']);
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("Floating Action Button", function () {
    var normalFAB;

    beforeEach(function() {
      normalFAB = document.querySelector('.fixed-action-btn');
      M.FloatingActionButton.init(normalFAB);
    });

    it("should open correctly", function (done) {
      var ul = normalFAB.querySelector('ul');
      var ulStyle = getComputedStyle(ul);
      expect(ulStyle.getPropertyValue('visibility')).toEqual('hidden', 'FAB menu div should be hidden initially');

      setTimeout(function() {
        mouseenter(normalFAB);

        setTimeout(function() {
          ulStyle = getComputedStyle(ul);
          expect(ulStyle.getPropertyValue('visibility')).toEqual('visible', 'FAB menu did not appear after mouseenter.');

          done();
        }, 400);
      }, 100);

    });
  });

  describe("FAB to toolbar", function () {
    var toolbarFAB;

    beforeEach(function() {
      toolbarFAB = document.querySelector('.fixed-action-btn.toolbar');
      M.FloatingActionButton.init(toolbarFAB, {
        toolbarEnabled: true
      });
    });

    it("should open correctly", function (done) {
      var ul = toolbarFAB.querySelector('ul');
      var ulStyle = getComputedStyle(ul);
      expect(ulStyle.getPropertyValue('visibility')).toEqual('hidden', 'FAB menu div should be hidden initially');


      setTimeout(function() {
        click(toolbarFAB);

        setTimeout(function() {
          ulStyle = getComputedStyle(ul);
          expect(ulStyle.getPropertyValue('visibility')).toEqual('visible', 'FAB menu did not appear after mouseenter.');
          click(document.body);

          setTimeout(function() {
            ulStyle = getComputedStyle(ul);
            expect(ulStyle.getPropertyValue('visibility')).toEqual('hidden', 'FAB menu div should be hidden after close');

            done();
          }, 400);
        }, 400);
      }, 100);
    });
  });


});
