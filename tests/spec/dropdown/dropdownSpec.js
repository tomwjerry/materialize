describe("Dropdown Plugin", function () {
  beforeEach(function() {
    //nothing common between all yet
  });

  describe("Dropdown basic functions", function () {
    var normalDropdown;

    beforeEach(function() {
      loadFixtures('dropdown/dropdownFixture.html');
      $('.dropdown-trigger').dropdown();
    });

    it("should open and close programmatically", function (done) {
      var dropdown1 = $('#dropdown1');
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      normalDropdown.dropdown('open');

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        normalDropdown.dropdown('close');

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("should close dropdown on document click if programmatically opened", function (done) {
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.');

      normalDropdown.dropdown('open');

      setTimeout(function() {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.');
        click(document.body);

        setTimeout(function() {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("should bubble events correctly", function (done) {
      var dropdown2 = $('#dropdown2');
      normalDropdown = $('#dropdownBubble');

      expect(dropdown2).toBeHidden('Should be hidden before dropdown is opened.');

      normalDropdown.find('i').click();

      setTimeout(function() {
        expect(dropdown2).toBeVisible('Should be shown after dropdown is opened.');
        click(document.body);

        setTimeout(function() {
          expect(dropdown2).toBeHidden('Should be hidden after dropdown is closed.');
          done();
        }, 400);
      }, 400);
    });

    it("hovered should destroy itself", function (done) {
      var dropdownTrigger = $('#dropdownDestroyTrigger');
      $(dropdownTrigger).dropdown('destroy');
      $(dropdownTrigger).dropdown({ hover: true });

      expect(function() {
        $(dropdownTrigger).dropdown('destroy');
      }).not.toThrow();

      setTimeout(function() {
        done();
      }, 400);
    });
  });

  fdescribe("Dropdown options and positioning", function () {

    beforeEach(function() {
      loadFixtures('dropdown/dropdownFixtureAdvanced.html');
      $('.dropdown-trigger').dropdown({hover: true});
    });

    it("should cover trigger element when coverTrigger is true", function(done){
      target = $('#test-1');
      trigger = M.Dropdown.getInstance(target).el
      dropdown = M.Dropdown.getInstance(target).dropdownEl;
      target.dropdown({hover: true, coverTrigger: true})
      mouseenter(target[0]);
      setTimeout(function(){
        expect(dropdown).toBeVisible("because the mouse is hovering");
        expect(dropdown.offsetTop >= trigger.offsetTop && dropdown.offsetTop < (trigger.offsetTop + 10) ).toBeTruthy("because it should be close to the top of the trigger");
        done()
      }, 200);
    });

    it("should not cover trigger element when coverTrigger is false", function(done){
      target = $('#test-1');
      trigger = M.Dropdown.getInstance(target).el
      dropdown = M.Dropdown.getInstance(target).dropdownEl;
      target.dropdown({hover: true, coverTrigger: false})
      mouseenter(target[0]);
      setTimeout(function(){
        expect(dropdown).toBeVisible("because the mouse is hovering");
        expect(dropdown.offsetTop >= (trigger.offsetTop + 72) ).toBeTruthy("because it should be positioned below the trigger");
        done()
      }, 200);
    });
    
    it("should cover trigger element when coverTrigger is true and alignment is bottom", function(done){
      pending("not implemented")
      done()
    });
    it("should not cover trigger element when coverTrigger is false and alignment is bottom", function(done){
      pending("not implemented")
      done()
    });
    it("should be wide as the content when constrainWidth is false", function(done){
      pending("not implemented")
      done()
    });
    it("should be scrollable when the list is long and the content overflows", function(done){
      pending("not implemented")
      done()
    });
  });

  describe("Function inside modal content", function(){
    it("should cover trigger element when coverTrigger is true", function(done){
      pending("not implemented")
      done()
    });
    it("should not cover trigger element when coverTrigger is false", function(done){
      pending("not implemented")
      done()
    });
    it("should cover trigger element when coverTrigger is true and alignment is bottom", function(done){
      pending("not implemented")
      done()
    });
    it("should not cover trigger element when coverTrigger is false and alignment is bottom", function(done){
      pending("not implemented")
      done()
    });
    describe("and container is body", function(){
      it("should cover trigger element when coverTrigger is true", function(done){
        pending("not implemented")
        done()
      });
      it("should not cover trigger element when coverTrigger is false", function(done){
        pending("not implemented")
        done()
      });
      it("should cover trigger element when coverTrigger is true and alignment is bottom", function(done){
        pending("not implemented")
        done()
      });
      it("should not cover trigger element when coverTrigger is false and alignment is bottom", function(done){
        pending("not implemented")
        done()
      });
    });
  });
});
