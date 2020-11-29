describe("Autocomplete Plugin", function () {
  beforeEach(async function(done) {
    await XloadFixtures(['autocomplete/autocompleteFixture.html']);
    setTimeout(function() {
      M.Autocomplete.init(
        document.querySelectorAll('input.autocomplete'),
        {
        data: {
          "Apple": null,
          "Microsoft": null,
          "Google": 'http://placehold.it/250x250'
        }
      });
      done();
    }, 400);
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe("Autocomplete", function () {
    // var browserSelect, normalInput, normalDropdown;

    // beforeEach(function() {
    //   browserSelect = $('select.normal');
    // });

    it("should work with multiple initializations", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var limited = M.Autocomplete.getInstance(normal);
      setTimeout(function() {
        limited.updateData({ "hi": null });
        limited.updateData({ "hi": null });
        limited.updateData({ "hi": null });
        limited.updateData({
          data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'http://placehold.it/250x250'
          }
        });

        var autocompleteEl = normal.parentNode.querySelectorAll('.autocomplete-content');

        expect(autocompleteEl.length).toEqual(1, 'Should dynamically generate autocomplete structure.');
        done();
      }, 400);
    });

    it("should limit results if option is set", function (done) {
      var limited = document.querySelector('#limited-autocomplete');
      var data = {};
      for (var i = 100; i >= 0; i--) {
        var randString = 'a' + Math.random().toString(36).substring(2);
        data[randString] = null;
      }

      var limitedInstance = M.Autocomplete.getInstance(limited);
      limitedInstance.updateData(data);
      limitedInstance.options.limit = 20;

      limited.focus();
      limited.value = 'a';
      keyup(limited, 65);

      setTimeout(function() {
        var autocompleteEl = limitedInstance.container;
        expect(autocompleteEl.children.length).toEqual(20, 'Results should be at max the set limit');
        done();
      }, 200);

    });

    it("should filter results", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'e';
      keyup(normal, 69);

      setTimeout(function () {
        expect(autocompleteEl.children.length).toEqual(2, 'Results containing e should return.');
        done();
      }, 200);
    });

    it("should display the correct text", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var normalInstance = M.Autocomplete.getInstance(normal);
      normalInstance.updateData({
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      });
      normalInstance.options.filterFunction = function (key_string, filter_string) {
        // each record is passed through this function
        // if false record is not displayed.
        return true;
      };
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'e';
      keyup(normal, 69);

      var labels = ["Apple", "Microsoft", "Google"];

      setTimeout(function () {
        for (i = 0; i < autocompleteEl.children.length; i++) {
          var found = labels.indexOf(autocompleteEl.children[i].innerText.trim())
          expect(found).toBeGreaterThan(-1, 'results should be in the initialized data')
        }
        done();
      }, 200);
    });

    it("should sort results with matches at the top", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var normalInstance = M.Autocomplete.getInstance(normal);
      normalInstance.updateData({
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      });
      normalInstance.options.filterFunction = function (key_string, filter_string) {
        // each record is passed through this function
        // if false record is not displayed.
        return true;
      };
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'mi';
      keyup(normal, 69);

      var labels = ["Microsoft", "Apple", "Google"];

      setTimeout(function () {
        for (i = 0; i < autocompleteEl.children.length; i++) {
          expect(autocompleteEl.children[i].innerText.trim()).toEqual(labels[i], 'results should be in the correct order')
        }
        done();
      }, 200);
    });

    it("should allow for custom filtered results", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var normalInstance = M.Autocomplete.getInstance(normal);
      normalInstance.updateData({
        "Apple": null,
        "Microsoft": null,
        "Google": 'http://placehold.it/250x250'
      });
      normalInstance.options.filterFunction = function (key_string, filter_string) {
        // each record is passed through this function
        // if false record is not displayed.
        return true;
      };
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'foo';
      keyup(normal, 69);

      setTimeout(function () {
        expect(autocompleteEl.children.length).toEqual(3, 'All rows should return.');
        done();
      }, 200);
    });

    it("Should update data to be processed.", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var instance = M.Autocomplete.getInstance(normal);

      instance.updateData({
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250',
        "Oracle": null
      });
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'e';
      keyup(normal, 69);

      setTimeout(function () {
        expect(autocompleteEl.children.length).toEqual(3, 'should return updated result set.');
        done();
      }, 200);
    });

    it("should open correctly from typing", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var autocompleteEl = normal.parentNode.querySelector('.autocomplete-content');

      normal.focus();
      normal.value = 'e';
      keyup(normal, 69);

      setTimeout(function () {
        expect(autocompleteEl.children.length).toEqual(2, 'Results should show dropdown on text input');
        done();
      }, 200);
    });

    it("should open correctly from keyboard focus", function (done) {
      var normal = document.querySelector('#normal-autocomplete');
      var autocompleteEl = normal.parentNode. querySelector('.autocomplete-content');

      normal.value = 'e';
      keyup(normal, 9);
      focus(normal);

      setTimeout(function () {
        expect(autocompleteEl.children.length).toEqual(2, 'Results should show dropdown on text input');
        done();
      }, 200);
    });
  });

});
