describe( 'Modal:', function() {
  var trigger1, modal1, trigger2, modal2, trigger3, modal3;

  beforeEach(async function() {
    await XloadFixtures(['modal/modalFixture.html']);
    trigger1 = document.querySelector('.btn[href="#modal1"]');
    triggerIcon1 = document.querySelector('.btn[data-target="modal1"] i');
    trigger2 = document.querySelector('.btn[href="#modal2"]');
    trigger3 = document.querySelector('.btn[href="#modal3"]');
    modal1 = document.querySelector('#modal1');
    modal2 = document.querySelector('#modal2');
    modal3 = document.querySelector('#modal3');
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe('Modals', function() {
    it('Should open and close correctly', function(done) {
      M.Modal.init(modal1);
      var modal1Style = getComputedStyle(modal1);
      expect(modal1Style.getPropertyValue('display')).toEqual('none', 'Modal should be hidden'); //TODO replace with alternative for deprecated jasmine-jquery

      click(trigger1);

      setTimeout(function() {
        modal1Style = getComputedStyle(modal1);
        expect(modal1Style.getPropertyValue('display')).toEqual('block', 'Modal should be shown'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(modal1.classList.contains('open')).toBeTrue('Modal should have class open');

        // Check overlay is attached
        var overlay = M.Modal.getInstance(modal1).$overlay;
        var overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toBeTrue('Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1.classList.contains('open')).toBeFalse('Modal should have class open removed');

          var overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toBeFalse('Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should open and close correctly with children elements in trigger', function(done) {
      M.Modal.init(modal1);
      var modal1Style = getComputedStyle(modal1);
      expect(modal1Style.getPropertyValue('display')).toEqual('none', 'Modal should be hidden'); //TODO replace with alternative for deprecated jasmine-jquery

      click(triggerIcon1);

      setTimeout(function() {
        modal1Style = getComputedStyle(modal1);
        expect(modal1Style.getPropertyValue('display')).toEqual('block', 'Modal should be shown'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(modal1.classList.contains('open')).toBeTrue('Modal should have class open');

        // Check overlay is attached
        var overlay = M.Modal.getInstance(modal1).$overlay;
        var overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toBeTrue('Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1.classList.contains('open')).toBeFalse('Modal should have class open removed');

          var overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toBeFalse('Overlay should be removed on close');

          done();
        }, 500);
      }, 500);
    });

    it('Should have a dismissible option', function(done) {
      M.Modal.init(modal1, {
        dismissible: false
      });

      click(trigger1);
      setTimeout(function() {
        modal1Style = getComputedStyle(modal1);
        expect(modal1Style.getPropertyValue('display')).toEqual('block', 'Modal should be shown'); //TODO replace with alternative for deprecated jasmine-jquery
        var overlay = M.Modal.getInstance(modal1).$overlay;
        var overlayInDOM = document.contains(overlay[0]);
        expect(overlayInDOM).toEqual(true, 'Overlay should be attached on open');

        click(overlay[0]);
        setTimeout(function() {
          expect(modal1Style.getPropertyValue('display')).toEqual('block', 'Modal should be shown'); //TODO replace with alternative for deprecated jasmine-jquery
          var overlayInDOM = document.contains(overlay[0]);
          expect(overlayInDOM).toBeTrue('modal should not be dismissable');

          done();
        }, 500);
      }, 500);
    });

    it('Should have callbacks', function(done) {
      var readyTest = false;
      var completeTest = false;
      M.Modal.init(modal1, {
        onOpenStart: function() {
          readyTest = true;
        },
        onCloseStart: function() {
          completeTest = true;
        }
      });

      expect(readyTest).toBeFalse('callback not yet fired');
      expect(completeTest).toBeFalse('callback not yet fired');

      click(trigger1);
      setTimeout(function() {
        expect(readyTest).toBeTrue('callback fired');
        expect(completeTest).toBeFalse('callback not yet fired');

        var overlay = M.Modal.getInstance(modal1).$overlay;
        click(overlay[0]);
        setTimeout(function() {
          expect(readyTest).toBeTrue('callback fired');
          expect(completeTest).toBeTrue('callback fired');

          done();
        }, 500);
      }, 500);
    });
  });

});
