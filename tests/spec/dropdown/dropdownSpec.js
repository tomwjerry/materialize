
describe('Dropdown Plugin', function () {
  
  describe('Dropdown basic functions', function () {
    var normalDropdown;
    beforeEach(async function () {      
      await XloadFixtures(['dropdown/dropdownFixture.html']);
      M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'));
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it('should open and close programmatically', function (done) {
      var dropdown1 = document.querySelector('#dropdown1');
      normalDropdown = document.querySelector('#dropdownActivator');
      var dropdown1Style = getComputedStyle(dropdown1);

      expect(dropdown1Style.getPropertyValue('display')).toEqual('none', 'Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
      M.Dropdown.getInstance(normalDropdown).open();
      setTimeout(function () {
        dropdown1Style = getComputedStyle(dropdown1);
        expect(dropdown1Style.getPropertyValue('display')).toEqual('block', 'Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        M.Dropdown.getInstance(normalDropdown).close();

        setTimeout(function () {
          dropdown1Style = getComputedStyle(dropdown1);
          expect(dropdown1Style.getPropertyValue('display')).toEqual('none', 'Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it('should close dropdown on document click if programmatically opened', function (done) {
      normalDropdown = document.querySelector('#dropdownActivator');
      var dropdown1Style = getComputedStyle(dropdown1);

      expect(dropdown1Style.getPropertyValue('display')).toEqual('none', 'Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery

      M.Dropdown.getInstance(normalDropdown).open();

      setTimeout(function () {
        dropdown1Style = getComputedStyle(dropdown1);
        expect(dropdown1Style.getPropertyValue('display')).toEqual('block', 'Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        click(document.body);

        setTimeout(function () {
          dropdown1Style = getComputedStyle(dropdown1);
          expect(dropdown1Style.getPropertyValue('display')).toEqual('none', 'Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it('should bubble events correctly', function (done) {
      var dropdown2 = document.querySelector('#dropdown2');
      normalDropdown = document.querySelector('#dropdownBubble');
      var dropdown2Style = getComputedStyle(dropdown2);

      expect(dropdown2Style.getPropertyValue('display')).toEqual('none', 'Should be hidden before dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery

      click(normalDropdown.querySelector('i'));

      setTimeout(function () {
        dropdown2Style = getComputedStyle(dropdown2);
        expect(dropdown2Style.getPropertyValue('display')).toEqual('block', 'Should be shown after dropdown is opened.'); //TODO replace with alternative for deprecated jasmine-jquery
        click(document.body);

        setTimeout(function () {
          dropdown2Style = getComputedStyle(dropdown2);
          expect(dropdown2Style.getPropertyValue('display')).toEqual('none', 'Should be hidden after dropdown is closed.'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 400);
      }, 400);
    });

    it('hovered should destroy itself', function (done) {
      var dropdownTrigger = document.querySelector('#dropdownDestroyTrigger');
      M.Dropdown.getInstance(dropdownTrigger).destroy();
      M.Dropdown.init(dropdownTrigger, { hover: true });

      expect(function () {
        M.Dropdown.getInstance(dropdownTrigger).destroy();
      }).not.toThrow();

      setTimeout(function () {
        done();
      }, 400);
    });
  });

  describe('Dropdown options and positioning', function () {

    beforeEach(async function () {
      await XloadFixtures(['dropdown/dropdownFixtureAdvanced.html']);
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it('should cover trigger element when coverTrigger is true', function (done) {
      target = document.querySelector('#test-1');
      M.Dropdown.init(target, { hover: true });
      mouseenter(target);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el
        dropdown = M.Dropdown.getInstance(target).dropdownEl;
        var dropdownElStyle = getComputedStyle(M.Dropdown.getInstance(target).dropdownEl);
        expect(dropdownElStyle.getPropertyValue('display')).toEqual('block', 'because the mouse is hovering'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(dropdown.top == trigger.top)
          .toBeTruthy('because the dropdown top should be at the trigger top');
        done();
      }, 200);
    });

    it('should not cover trigger element when coverTrigger is false', function (done) {
      target = document.querySelector('#test-1');
      M.Dropdown.init(target, { hover: true, coverTrigger: false });
      mouseenter(target);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.top == trigger.bottom)
          .toBeTruthy('because the dropdown top should be at the trigger bottom');
        done();
      }, 200);
    });

    it('should cover trigger element when coverTrigger is true and alignment is bottom', function (done) {
      target = document.querySelector('#test-2');
      M.Dropdown.init(target, { hover: true });
      mouseenter(target);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.bottom == trigger.bottom)
          .toBeTruthy('because the dropdown bottom should be aligned with the bottom of the trigger');
        done();
      }, 200);
    });

    it('should not cover trigger element when coverTrigger is false and alignment is bottom', function (done) {
      target = document.querySelector('#test-2');
      M.Dropdown.init(target, { hover: true, coverTrigger: false });
      mouseenter(target);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.bottom == trigger.top)
          .toBeTruthy('because the dropdown bottom should be aligned with the top of the trigger');
        done();
      }, 200);
    });

    it('should be wide as the content when constrainWidth is false', function (done) {
      target = document.querySelector('#test-1');
      M.Dropdown.init(target, { hover: true, constrainWidth: false });
      mouseenter(target);
      setTimeout(function () {
        trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
        dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
        expect(dropdown.width).toBeGreaterThan(trigger.width, 'because it should expand to fit the content');
        done();
      }, 200);
    });

    it('should be scrollable when the list is long and the content overflows', function (done) {
      target = document.querySelector('#test-3');
      M.Dropdown.init(target, { hover: true });
      mouseenter(target);
      setTimeout(function () {
        dropdown = M.Dropdown.getInstance(target);
        expect(dropdown.dropdownEl.scrollHeight)
          .toBeGreaterThan(dropdown.dropdownEl.offsetHeight, 'because the dropdown should be truncated to fit on the screen');
        expect(dropdown.isScrollable).toBeTruthy('because the dropdown container must be scrollable when truncated');
        done();
      }, 200);
    });
  });

  describe('Function inside modal content', function () {
    
    beforeEach(async function () {
      await XloadFixtures(['dropdown/dropdownFixtureAdvanced.html']);
      modal1 = document.querySelector('#modal1');
      M.Modal.init(modal1);
      click(document.querySelector('#modal1-trigger'));
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it('should cover trigger element when coverTrigger is true', function (done) {
      setTimeout(function(){
        modalBox = document.querySelector('#mod\al1-content').getBoundingClientRect();
        target = document.querySelector('#test-modal1');
        M.Dropdown.init(target, { hover: true });
        mouseenter(target);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.top).toBeCloseTo(trigger.top, -1, 'because the dropdown top should be close to the trigger top')
          done();
        }, 200);
      }, 200);
    });

    it('should not cover trigger element when coverTrigger is false', function (done) {
      setTimeout(function(){
        target = document.querySelector('#test-modal1');
        M.Dropdown.init(target, { hover: true, coverTrigger: false });
        mouseenter(target);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.top).toBeCloseTo(trigger.bottom, -1, 'because the dropdown top should be close to the trigger bottom')
          done();
        }, 200);
      }, 200);
    });

    it('should cover trigger element when coverTrigger is true and alignment is bottom', function (done) {
      setTimeout(function(){
        target = document.querySelector('#test-modal1');
        M.Dropdown.init(target, { hover: true });
        document.querySelector('#modal1-top-spacer').style.height = '300px';
        mouseenter(target);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.bottom).toBeCloseTo(trigger.bottom, -1, 'because the dropdown bottom should be close to the trigger bottom')
          done();
        }, 200);
      }, 200);
    });

    it('should not cover trigger element when coverTrigger is false and alignment is bottom', function (done) {
      setTimeout(function(){
        target = document.querySelector('#test-modal1');
        M.Dropdown.init(target, { hover: true, coverTrigger: false });
        document.querySelector('#modal1-top-spacer').style.height = '300px';
        mouseenter(target);
        setTimeout(function(){
          trigger = M.Dropdown.getInstance(target).el.getBoundingClientRect();
          dropdown = M.Dropdown.getInstance(target).dropdownEl.getBoundingClientRect();
          expect(dropdown.bottom).toBeCloseTo(trigger.top, -1, 'because the dropdown bottom should be close to the trigger top')
          done();
        }, 200);
      }, 200);
    });

    it('the body should not be relative positioned', function (done) {
      document.body.style.position = ''; //HACK reset body postion, it's being contaminated by previous tests. This test passes without this line when run alone, but fails when running the entire suite
      setTimeout(function(){
        M.Dropdown.init(document.querySelector('#test-modal1'), { container: document.body });
        M.Modal.getInstance(document.querySelector('#modal1')).open(); //HACK should be able to just use the click() or mouseenter() helpers, but they break the FAB tests when this suite runs before the FAB suite
        setTimeout(function(){
          expect(document.body.style.position).not.toEqual('relative', 'because a relative positioned body with fixed children causes problems')
          done();
        }, 200);
      }, 200);
    });
    
  });
});
