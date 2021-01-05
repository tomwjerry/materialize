describe( 'Tooltip:', function() {
  beforeEach(async function() {
    await XloadFixtures(['tooltip/tooltipFixture.html']);
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
        enterDelay: 0, exitDelay: 0, inDuration: 100, outDuration: 100});
  });
  afterEach(function(){
    XunloadFixtures();
  });

  describe('Tooltip opens and closes properly', function() {


    it('Opens a tooltip on mouse enter', function(done) {
      let tooltippedBtn = document.querySelector('#test');
      let tooltip = M.Tooltip.getInstance(tooltippedBtn).tooltipEl;

      // Mouse enter
      mouseenter(tooltippedBtn);
      setTimeout(function() {
        expect(tooltip).toBeVisible('because mouse entered tooltipped btn'); //TODO replace with alternative for deprecated jasmine-jquery
        expect(tooltip.querySelector('.tooltip-content').innerText).toBe('I am tooltip',
            'because that is the defined text in the html attribute');
        // Mouse leave
        mouseleave(tooltippedBtn);
        setTimeout(function() {
          expect(tooltip).toBeVisible('because mouse left tooltipped btn'); //TODO replace with alternative for deprecated jasmine-jquery
          done();
        }, 300);
      }, 200);
    });


    it('Positions tooltips smartly on the bottom within the screen bounds', function(done) {
      let tooltippedBtn = document.querySelector('#test1');
      let tooltip = M.Tooltip.getInstance(tooltippedBtn).tooltipEl;
      // Mouse enter
      mouseenter(tooltippedBtn);

      setTimeout(function() {
        const tooltipRect = tooltip.getBoundingClientRect();
        const tooltippedBtnRect = tooltippedBtn.getBoundingClientRect();
        // Check window bounds
        expect(tooltipRect.top).toBeGreaterThanOrEqual(0);
        expect(tooltipRect.bottom).toBeLessThanOrEqual(
            window.innerHeight);
        expect(tooltipRect.left).toBeGreaterThanOrEqual(0);
        expect(tooltipRect.right).toBeLessThanOrEqual(
            window.innerWidth);

        // check if tooltip is under btn
        expect(tooltipRect.top).toBeGreaterThan(
            tooltippedBtnRect.bottom);
        done();
      }, 300);
    });


    it('Removes tooltip dom object', function() {
      let tooltippedBtn = document.querySelector('#test1');
      M.Tooltip.getInstance(tooltippedBtn).destroy();

      // Check DOM element is removed
      let tooltipInstance = M.Tooltip.getInstance(tooltippedBtn);
      expect(tooltipInstance).toBeUndefined();
    });


    it('Changes position attribute dynamically and positions tooltips on the right correctly',
        function(done) {
          let tooltippedBtn = document.querySelector('#test');
          tooltippedBtn.setAttribute('data-position', 'right');
          let tooltip = M.Tooltip.getInstance(tooltippedBtn).tooltipEl;
          // Mouse enter
          mouseenter(tooltippedBtn);

          setTimeout(function() {
            const tooltipRect = tooltip.getBoundingClientRect();
            const tooltippedBtnRect = tooltippedBtn.getBoundingClientRect();
            expect(tooltipRect.left).toBeGreaterThan(
                tooltippedBtnRect.right);
            done();
          }, 300);
        });


    it('Accepts delay option from javascript initialization', function(done) {
      let tooltippedBtn = document.querySelector('#test');
      tooltippedBtn.removeAttribute('data-delay');
      M.Tooltip.init(tooltippedBtn, {enterDelay: 200});
      let tooltip = M.Tooltip.getInstance(tooltippedBtn).tooltipEl;
      mouseenter(tooltippedBtn);
      setTimeout(function() {
        const tooltipVisibility = getComputedStyle(tooltip).getPropertyValue('visibility');
        expect(tooltipVisibility).toBe('hidden', 'because the delay is 200 seconds');
      }, 150);

      setTimeout(function() {
        expect(tooltip).toBeVisible('because 200 seconds has passed'); //TODO replace with alternative for deprecated jasmine-jquery
        done();
      }, 250);

    });

    it('Works with a fixed position parent', function(done) {
      let tooltippedBtn = document.querySelector('#test2');
      let tooltip = M.Tooltip.getInstance(tooltippedBtn).tooltipEl;

      mouseenter(tooltippedBtn);
      setTimeout(function() {
        let tooltipRect = tooltip.getBoundingClientRect();
        let tooltippedBtnRect = tooltippedBtn.getBoundingClientRect();
        let verticalDiff = tooltipRect.top - tooltippedBtnRect.top;
        let horizontalDiff = (tooltipRect.left + tooltipRect.width/2) - (tooltippedBtnRect.left + tooltippedBtnRect.width / 2);

        // 52 is magic number for tooltip vertical offset
        expect(verticalDiff > 0 && verticalDiff < 52).toBeTrue('top position in fixed to be correct');
        expect(horizontalDiff > -1 && horizontalDiff < 1).toBeTrue('left position in fixed to be correct');
        done();
      }, 300);
    });

  });

});
