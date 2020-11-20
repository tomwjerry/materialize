
describe("Dropdown Plugin", function () {
  
  describe("Dropdown basic functions", function () {
    var normalDropdown;
    beforeEach(async function () {      
      await XloadFixtures(['dropdown/dropdownFixture.html']);
      $('.dropdown-trigger').dropdown();
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it("should open and close programmatically", function (done) {
      var dropdown1 = $('#dropdown1');
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
      normalDropdown.dropdown('open');
      setTimeout(function () {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        normalDropdown.dropdown('close');

        setTimeout(function () {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it("should close dropdown on document click if programmatically opened", function (done) {
      normalDropdown = $('#dropdownActivator');

      expect(dropdown1).toBeHidden('Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery

      normalDropdown.dropdown('open');

      setTimeout(function () {
        expect(dropdown1).toBeVisible('Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        click(document.body);

        setTimeout(function () {
          expect(dropdown1).toBeHidden('Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it("should bubble events correctly", function (done) {
      var dropdown2 = $('#dropdown2');
      normalDropdown = $('#dropdownBubble');

      expect(dropdown2).toBeHidden('Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery

      normalDropdown.find('i').click();

      setTimeout(function () {
        expect(dropdown2).toBeVisible('Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        click(document.body);

        setTimeout(function () {
          expect(dropdown2).toBeHidden('Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it("hovered should destroy itself", function (done) {
      var dropdownTrigger = $('#dropdownDestroyTrigger');
      $(dropdownTrigger).dropdown('destroy');
      $(dropdownTrigger).dropdown({ hover: true });

      expect(function () {
        $(dropdownTrigger).dropdown('destroy');
      }).not.toThrow();

      setTimeout(function () {
        done();
      }, 400);
    });
  });

  describe("Dropdown options and positioning", function () {

    beforeEach(async function () {
      await XloadFixtures(['dropdown/dropdownFixtureAdvanced.html']);
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it("should cover trigger element when coverTrigger is true", function (done) {
      target = $('#test-1');
      target.dropdown({ hover: true });
      mouseenter(target[0]);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el
        dropdown = M.Dropdown.getInstance(target).dropdownEl;
        expect(M.Dropdown.getInstance(target).dropdownEl).toBeVisible("because the mouse is hovering"); //TODO replace with alternative for deprecated jasmine-jquery
        expect(dropdown.top == trigger.top)
          .toBeTruthy("because the dropdown top should be at the trigger top");
        done();
      }, 200);
    });

    it("should not cover trigger element when coverTrigger is false", function (done) {
      target = $('#test-1');
      target.dropdown({ hover: true, coverTrigger: false });
      mouseenter(target[0]);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.top == trigger.bottom)
          .toBeTruthy("because the dropdown top should be at the trigger bottom");
        done();
      }, 200);
    });

    it("should cover trigger element when coverTrigger is true and alignment is bottom", function (done) {
      target = $('#test-2');
      target.dropdown({ hover: true });
      mouseenter(target[0]);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.bottom == trigger.bottom)
          .toBeTruthy("because the dropdown bottom should be aligned with the bottom of the trigger");
        done();
      }, 200);
    });

    it("should not cover trigger element when coverTrigger is false and alignment is bottom", function (done) {
      target = $('#test-2');
      target.dropdown({ hover: true, coverTrigger: false });
      mouseenter(target[0]);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.bottom == trigger.top)
          .toBeTruthy("because the dropdown bottom should be aligned with the top of the trigger");
        done();
      }, 200);
    });

    it("should be wide as the content when constrainWidth is false", function (done) {
      target = $('#test-1');
      target.dropdown({ hover: true, constrainWidth: false });
      mouseenter(target[0]);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.width).toBeGreaterThan(trigger.width, "because it should expand to fit the content");
        done();
      }, 200);
    });

    it("should be scrollable when the list is long and the content overflows", function (done) {
      target = $('#test-3');
      target.dropdown({ hover: true });
      mouseenter(target[0]);
      setTimeout(function () {
        dropdown = M.Dropdown.getInstance(target);
        expect(dropdown.dropdownEl.scrollHeight)
          .toBeGreaterThan(dropdown.dropdownEl.offsetHeight, "because the dropdown should be truncated to fit on the screen");
        expect(dropdown.isScrollable).toBeTruthy("because the dropdown container must be scrollable when truncated");
        done();
      }, 200);
    });
  });

  describe("Function inside modal content", function () {
    
    beforeEach(async function () {
      await XloadFixtures(['dropdown/dropdownFixtureAdvanced.html']);
      modal1 = $('#modal1');
      modal1.modal();
      click($('#modal1-trigger')[0]);
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it("should cover trigger element when coverTrigger is true", function (done) {
      setTimeout(function(){
        modalBox = $('#mod\al1-content')[0].getBoundingClientRect();
        target = $('#test-modal1');
        target.dropdown({ hover: true });
        mouseenter(target[0]);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.top).toBeCloseTo(trigger.top, -1, "because the dropdown top should be close to the trigger top")
          done();
        }, 200);
      }, 200);
    });

    it("should not cover trigger element when coverTrigger is false", function (done) {
      setTimeout(function(){
        target = $('#test-modal1');
        target.dropdown({ hover: true, coverTrigger: false });
        mouseenter(target[0]);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.top).toBeCloseTo(trigger.bottom, -1, "because the dropdown top should be close to the trigger bottom")
          done();
        }, 200);
      }, 200);
    });

    it("should cover trigger element when coverTrigger is true and alignment is bottom", function (done) {
      setTimeout(function(){
        target = $('#test-modal1');
        target.dropdown({ hover: true });
        $('#modal1-top-spacer').css('height', '300px');
        mouseenter(target[0]);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.bottom).toBeCloseTo(trigger.bottom, -1, "because the dropdown bottom should be close to the trigger bottom")
          done();
        }, 200);
      }, 200);
    });

    it("should not cover trigger element when coverTrigger is false and alignment is bottom", function (done) {
      setTimeout(function(){
        target = $('#test-modal1');
        target.dropdown({ hover: true, coverTrigger: false });
        $('#modal1-top-spacer').css('height', '300px');
        mouseenter(target[0]);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.bottom).toBeCloseTo(trigger.top, -1, "because the dropdown bottom should be close to the trigger top")
          done();
        }, 200);
      }, 200);
    });

    it("the body should not be relative positioned", function (done) {
      document.body.style.position = ''; //HACK reset body postion, it's being contaminated by previous tests. This test passes without this line when run alone, but fails when running the entire suite
      setTimeout(function(){
        $('#test-modal1').dropdown({ container: document.body });
        M.Modal.getInstance($('#modal1')).open(); //HACK should be able to just use the click() or mouseenter() helpers, but they break the FAB tests when this suite runs before the FAB suite
        setTimeout(function(){
          expect(document.body.style.position).not.toEqual('relative', "because a relative positioned body with fixed children causes problems")
          done();
        }, 200);
      }, 200);
    });
    
  });
});
