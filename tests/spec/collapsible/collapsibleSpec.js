describe( "Collapsible Plugin", function () {
  var collapsible, accordion, popout, expandable, expandablePreselect;

  beforeEach(async function() {
    await XloadFixtures(['collapsible/collapsible.html']);
    collapsible = document.querySelectorAll('.collapsible');
    expandable = document.querySelector('.expandable');
    expandablePreselect = document.querySelector('.expandable-preselected');
    accordion = document.querySelector('.accordion');
    popout = document.querySelector('.popout');
    M.Collapsible.init(collapsible);
    M.Collapsible.init(expandable, {accordion: false});
    M.Collapsible.init(expandablePreselect, {accordion: false});
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe( "collapsible", function () {

    it("should open all items, keeping all open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var headers = expandable.querySelectorAll('.collapsible-header');
      var bodies = expandable.querySelectorAll('.collapsible-body');

      for (var i = 0; i < bodies.length; i++) {
        var styles = getComputedStyle(bodies[i]);
        expect(styles.getPropertyValue('display')).toEqual('none', 'because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
      }

      // Collapsible body height should be > 0 after being opened.
      for (var i = 0; i < headers.length; i++) {
        click(headers[i]);
      }

      setTimeout(function() {
        for (var i = 0; i < bodies.length; i++) {
          var styles = getComputedStyle(bodies[i]);
          expect(styles.getPropertyValue('display')).toEqual('block', 'because collapsible bodies not visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        }
        done();
      }, 400);
    });

    it("should allow preopened sections", function () {
      var bodies = expandablePreselect.querySelectorAll('.collapsible-body');

      for (var i = 0; i < bodies.length; i++) {
        var headerLi = bodies[i].parentNode;
        var styles = getComputedStyle(bodies[i]);

        if (i === 1) {
          expect(headerLi.classList.contains('active')).toBeTrue('because collapsible header should have active class to be preselected.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(styles.getPropertyValue('display')).toEqual('block', 'because collapsible bodies should be visible if preselected.'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect(styles.getPropertyValue('display')).toEqual('none', 'because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      }
    });

    it("should open and close programmatically with callbacks", function(done) {
      var openCallback = false;
      var closeCallback = false;
      M.Collapsible.init(expandable, {
        accordion: false,
        onOpenStart: function() {
          openCallback = true;
        },
        onCloseStart: function() {
          closeCallback = true;
        }
      });
      var bodies = expandable.querySelectorAll('.collapsible-body');

      expect(openCallback).toEqual(false, 'because open callback not yet fired');
      expect(closeCallback).toEqual(false, 'because close callback not yet fired');

      for (var i = 0; i < bodies.length; i++) {
        var styles = getComputedStyle(bodies[i]);
        expect(styles.getPropertyValue('display')).toEqual('none', 'because collapsible bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
        var collapsibleInstance = M.Collapsible.getInstance(bodies[i].parentNode.parentNode);
        collapsibleInstance.open(i);
      }
      expect(openCallback).toEqual(true, 'because open callback fired');

      setTimeout(function() {
        for (var i = 0; i < bodies.length; i++) {
          var styles = getComputedStyle(bodies[i]);
          expect(styles.getPropertyValue('display')).toEqual('block', 'because collapsible bodies should be visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
          M.Collapsible.getInstance(bodies[i].parentNode.parentNode).close(i);
        };
        expect(closeCallback).toEqual(true, 'because close callback fired');

        setTimeout(function() {
          for (var i = 0; i < bodies.length; i++) {
            var styles = getComputedStyle(bodies[i]);
            expect(styles.getPropertyValue('display')).toEqual('none', 'because collapsible bodies should be hidden after close.'); //TODO replace with alternative for deprecated jasmine-jquery
          };

          done();
        }, 400);
      }, 400);
    });
  });

  describe( "accordion", function () {

    it("should open first and second items, keeping only second open", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var firstHeader = accordion.querySelector('.collapsible-header');
      var firstBody = accordion.querySelector('.collapsible-body');
      var secondHeader = accordion.querySelectorAll('.collapsible-header')[1];
      var secondBody = accordion.querySelectorAll('.collapsible-body')[1];
      var firstStyles = getComputedStyle(firstBody);
      var seconsStyles = getComputedStyle(secondBody);
      expect(firstStyles.getPropertyValue('display')).toEqual('none', 'because accordion bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery
      expect(seconsStyles.getPropertyValue('display')).toEqual('none', 'because accordion bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery

      // Collapsible body height should be > 0 after being opened.
      click(firstHeader);

      setTimeout(function() {
        firstStyles = getComputedStyle(firstBody);
        expect(firstStyles.getPropertyValue('display')).toEqual('block', 'because accordion bodies not visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        click(secondHeader);

        setTimeout(function() {
          firstStyles = getComputedStyle(firstBody);
          seconsStyles = getComputedStyle(secondBody);
          expect(firstStyles.getPropertyValue('display')).toEqual('none', 'because accordion bodies should be hidden when another item is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(seconsStyles.getPropertyValue('display')).toEqual('block', 'because accordion bodies not visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 200);

    });
  });

  describe( "popout", function () {

    it("should open first and popout", function (done) {
      // Collapsible body height should be 0 on start when hidden.
      var listItems = popout.querySelectorAll('li');
      var firstHeader = popout.querySelector('.collapsible-header');
      var firstBody = popout.querySelector('.collapsible-body');
      var firstBodyStyles = getComputedStyle(firstBody);
      expect(firstBodyStyles.getPropertyValue('display')).toEqual('none', 'because accordion bodies should be hidden initially.'); //TODO replace with alternative for deprecated jasmine-jquery

      // Expect margin to be > 0 because not popped out.
      var listItems = popout.querySelectorAll('li');
      for (var i = 0; i < listItems.length; i++) {
        var listItemStyles = getComputedStyle(listItems[i]);
        var marginLeft = parseInt(listItemStyles.getPropertyValue('margin-left'));
        var marginRight = parseInt(listItemStyles.getPropertyValue('margin-right'));
        expect(marginLeft).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
        expect(marginRight).toBeGreaterThan(0, 'because closed popout items should have horizontal margins.');
      };

      // expect margin to be 0 because popped out.
      click(firstHeader);
      setTimeout(function() {
        var firstStyles = getComputedStyle(listItems[0]);
        var firstMarginLeft = parseInt(firstStyles.getPropertyValue('margin-left'));
        var firstMarginRight = parseInt(firstStyles.getPropertyValue('margin-right'));
        firstBodyStyles = getComputedStyle(firstBody);
        expect(firstMarginLeft).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstMarginRight).toEqual(0, 'because opened popout items should have no horizontal margins.');
        expect(firstBodyStyles.getPropertyValue('display')).toEqual('block', 'because accordion bodies not visible after being opened.'); //TODO replace with alternative for deprecated jasmine-jquery

        done();
      }, 400);

    });
  });
});
