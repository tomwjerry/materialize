describe("Tabs Plugin", function () {

  describe("Tabs", function () {
    var normalTabs;
    beforeEach(async function() {
      await XloadFixtures(['tabs/tabsFixture.html']);
      normalTabs = document.querySelector('.tabs.normal');
      M.Tabs.init(document.getElementById("normal-tabs"), {});
      window.location.hash = "";
      //HACK the tabs init function not fully initializing. it restores state even after element has been removed from DOM, even after using tabInstance.destroy()
      M.Tabs.getInstance(normalTabs).select('test2')
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it("should open to active tab", function () {
      const activeTab = normalTabs.querySelector('.active');
      const activeTabHash = activeTab.getAttribute('href');
      const tabLinks = normalTabs.querySelectorAll('.tab a');
      for (let i = 0; i < tabLinks.length; i++) {
        var tabHash = tabLinks[i].getAttribute('href');
        if (tabHash === activeTabHash) {
          expect(document.querySelector(tabHash)).toBeVisible('active tab content should be visible by default'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect(document.querySelector(tabHash)).toBeHidden('Tab content should be hidden by default'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      }

      var indicator = normalTabs.querySelector('.indicator');
      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');
    });

    it("should switch to clicked tab", function (done) {
      const activeTab = normalTabs.querySelector('.active');
      const activeTabHash = activeTab.getAttribute('href');
      const disabledTab = normalTabs.querySelector('.disabled a');
      const disabledTabHash = disabledTab.getAttribute('href');
      const firstTab = normalTabs.querySelector('.tab a');
      const firstTabHash = firstTab.getAttribute('href');
      const indicator = normalTabs.querySelector('.indicator');

      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');

      click(disabledTab);

      setTimeout(function() {
        expect(document.querySelector(activeTabHash)).toBeVisible('Clicking disabled should not change tabs.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(document.querySelector(disabledTabHash)).toBeHidden('Clicking disabled should not change tabs.'); //TODO replace with alternative for deprecated jasmine-jquery


        click(firstTab);

        setTimeout(function() {
          expect(document.querySelector(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(document.querySelector(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(indicator.offsetLeft).toEqual(firstTab.offsetLeft, 'Indicator should move to clicked tab.');
          done();
        }, 400);
      }, 400);
    });

    it("shouldn't hide active tab if clicked while active", function (done) {
      const activeTab = normalTabs.querySelector('.active');
      const activeTabHash = activeTab.getAttribute('href');
      const indicator = normalTabs.querySelector('.indicator');

      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery

      click(activeTab);

      setTimeout(function() {
        expect(document.querySelector(activeTabHash)).toBeVisible('Clicking active tab while active should not hide it.'); //TODO replace with alternative for deprecated jasmine-jquery
        done();
      }, 400);
    });


    it("should horizontally scroll when too many tabs", function (done) {
      let tabsScrollWidth = 0;
      normalTabs.style.width = '400px';
      const tabs = normalTabs.querySelectorAll('.tab');
      for (let i = 0; i < tabs.length; i++) {
        setTimeout(function() {
          tabsScrollWidth += tabs[i].offsetWidth;
        }, 0);
      }

      setTimeout(function() {
        expect(tabsScrollWidth).toBeGreaterThan(normalTabs.offsetWidth, 'Scroll width should exceed tabs width');
        done();
      }, 400);
    });

    it("should programmatically switch tabs", function (done) {
      const activeTab = normalTabs.querySelector('.active');
      const activeTabHash = activeTab.getAttribute('href');
      const firstTab = normalTabs.querySelector('li a');
      const firstTabHash = firstTab.getAttribute('href');
      const indicator = normalTabs.querySelector('.indicator');

      const tabs = normalTabs.querySelectorAll('.tab a');
      for (let i = 0; i < tabs.length; i++) {
        const tabHash = tabs[i].getAttribute('href');
        if (tabHash === activeTabHash) {
          expect(document.querySelector(tabHash)).toBeVisible('active tab content should be visible by default'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect(document.querySelector(tabHash)).toBeHidden('Tab content should be hidden by default'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      }

      M.Tabs.getInstance(normalTabs).select('test1');

      setTimeout(function() {
        expect(document.querySelector(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(document.querySelector(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(indicator.offsetLeft).toEqual(firstTab.offsetLeft, 'Indicator should move to clicked tab.');
        done();
      }, 400);
    });

    it("shouldn't error if tab has no associated content", function (done) {
      document.querySelector('#test8').remove();
      const tabNoContent = document.querySelector('[href="#test8"]');
      expect(tabNoContent.classList.contains('active')).toBeFalse('Tab should not be selected');
      click(tabNoContent);

      setTimeout(function() {
        expect(tabNoContent.classList.contains('active')).toBeTrue('Tab should be selected even with no content');
        done();
      }, 400);
    });

  });
});
