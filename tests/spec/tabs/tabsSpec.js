describe("Tabs Plugin", function () {

  describe("Tabs", function () {
    var normalTabs;
    beforeEach(async function() {
      await XloadFixtures(['tabs/tabsFixture.html']);
      normalTabs = $('.tabs.normal');
      M.Tabs.init(document.getElementById("normal-tabs"), {});
      window.location.hash = "";
      //HACK the tabs init function not fully initializing. it restores state even after element has been removed from DOM, even after using tabInstance.destroy()
      normalTabs.tabs('select', 'test2')
    });
    afterEach(function(){
      XunloadFixtures();
    });

    it("should open to active tab", function () {
      const activeTab = normalTabs.find('.active');
      const activeTabHash = activeTab.attr('href');
      normalTabs.find('.tab a').each(function() {
        var tabHash = $(this).attr('href');
        if (tabHash === activeTabHash) {
          expect($(tabHash)).toBeVisible('active tab content should be visible by default'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect($(tabHash)).toBeHidden('Tab content should be hidden by default'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      });

      var indicator = normalTabs.find('.indicator');
      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');
    });

    it("should switch to clicked tab", function (done) {
      const activeTab = normalTabs.find('.active');
      const activeTabHash = activeTab.attr('href');
      const disabledTab = normalTabs.find('.disabled a');
      const disabledTabHash = disabledTab.attr('href');
      const firstTab = normalTabs.find('.tab a').first();
      const firstTabHash = firstTab.attr('href');
      const indicator = normalTabs.find('.indicator');

      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery
      // expect(Math.abs(indicator.offset().left - activeTab.offset().left)).toBeLessThan(1, 'Indicator should be at active tab by default.');

      click(disabledTab[0]);

      setTimeout(function() {
        expect($(activeTabHash)).toBeVisible('Clicking disabled should not change tabs.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect($(disabledTabHash)).toBeHidden('Clicking disabled should not change tabs.'); //TODO replace with alternative for deprecated jasmine-jquery


        click(firstTab[0]);

        setTimeout(function() {
          expect($(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect($(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
          expect(indicator.offset().left).toEqual(firstTab.offset().left, 'Indicator should move to clicked tab.');
          done();
        }, 400);
      }, 400);
    });

    it("shouldn't hide active tab if clicked while active", function (done) {
      const activeTab = normalTabs.find('.active');
      const activeTabHash = activeTab.attr('href');
      const indicator = normalTabs.find('.indicator');

      expect(indicator).toExist('Indicator should be generated'); //TODO replace with alternative for deprecated jasmine-jquery

      click(activeTab[0]);

      setTimeout(function() {
        expect($(activeTabHash)).toBeVisible('Clicking active tab while active should not hide it.'); //TODO replace with alternative for deprecated jasmine-jquery
        done();
      }, 400);
    });


    it("should horizontally scroll when too many tabs", function (done) {
      let tabsScrollWidth = 0;
      normalTabs.parent().css('width', '400px');
      normalTabs.find('.tab').each(function() {
        setTimeout(function() {
          tabsScrollWidth += $(this).width();
        }, 0);
      });

      setTimeout(function() {
        expect(tabsScrollWidth).toBeGreaterThan(normalTabs.width(), 'Scroll width should exceed tabs width');
        done();
      }, 400);
    });

    it("should programmatically switch tabs", function (done) {
      const activeTab = normalTabs.find('.active');
      const activeTabHash = activeTab.attr('href');
      const firstTab = normalTabs.find('li a').first();
      const firstTabHash = firstTab.attr('href');
      const indicator = normalTabs.find('.indicator');

      normalTabs.find('.tab a').each(function() {
        const tabHash = $(this).attr('href');
        if (tabHash === activeTabHash) {
          expect($(tabHash)).toBeVisible('active tab content should be visible by default'); //TODO replace with alternative for deprecated jasmine-jquery
        } else {
          expect($(tabHash)).toBeHidden('Tab content should be hidden by default'); //TODO replace with alternative for deprecated jasmine-jquery
        }
      });

      normalTabs.tabs('select', 'test1');

      setTimeout(function() {
        expect($(activeTabHash)).toBeHidden('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect($(firstTabHash)).toBeVisible('Clicking tab should switch to that tab.'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(indicator.offset().left).toEqual(firstTab.offset().left, 'Indicator should move to clicked tab.');
        done();
      }, 400);
    });

    it("shouldn't error if tab has no associated content", function (done) {
      $('#test8').remove();
      const tabNoContent = $('[href="#test8"]').first();
      expect(tabNoContent.hasClass('active')).toEqual(false, 'Tab should not be selected');
      click($('[href="#test8"]')[0]);

      setTimeout(function() {
        expect(tabNoContent.hasClass('active')).toEqual(true, 'Tab should be selected even with no content');
        done();
      }, 400);
    });

  });
});
