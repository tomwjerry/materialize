describe( 'Toasts:', function() {
  const toastOutDuration = 375;
  const toastInDuration = 300;

  describe('Toast javascript functions', function() {
    // Toast out animation duration does not count as part of its timer.
    it('should display and remove a toast', function(done) {
      M.toast({html: 'Test toast', displayLength: toastInDuration, classes: 'toast-id-2'});

      setTimeout(function() {
        let toast = document.querySelectorAll('.toast-id-2');
        expect(toast.length).toBe(1);
        expect(toast[0]).toBeVisible(); //TODO replace with alternative for deprecated jasmine-jqueryv
        expect(toast[0].innerText).toBe('Test toast');
        setTimeout(function() {
          let toast = document.querySelectorAll('.toast-id-2');
          expect(toast[0]).toBeVisible(); //TODO replace with alternative for deprecated jasmine-jquery
          expect(toast.length).toBe(1, 'because toast duration still on going');
          setTimeout(function() {
            let toast = document.querySelectorAll('.toast-id-2');
            expect(toast.length).toBe(0, 'because toast should be removed by now');
            done();
          }, toastOutDuration + 90); // .1s leeway is given
        }, 10);
      }, toastInDuration);
    });

    it('Opens a toast with HTML content', function() {
      let toastContent = document.createElement("span");
      toastContent.innerText = 'I am toast content';
      //Use custom class to identify toast so it's not confused by previous test toasts still hanging around.
      M.toast({html: toastContent, displayLength: 400, classes: 'toast-id-1'});
      let toastSpan = document.querySelector('.toast-id-1');
      expect(toastSpan.innerText).toBe('I am toast content');
      expect(toastSpan.innerText).not.toBe('I am toast');
    });

    it('Toasts should call the callback function when dismissed', function(done) {
      let boolObj = {wasCalled: false};
      let callback = function() {
        boolObj.wasCalled = true;
      };
      M.toast({html: 'I am a toast', displayLength:100, completeCallback: callback});
      setTimeout(function() {
        expect(boolObj.wasCalled).toBeTruthy('because the callback set it to true');
        done();
      }, 500);
    });

    it('Apply two custom class to a toast', function() {
      M.toast({html:'Hi', displayLength: 400, classes: 'round flat'});
      let toastFlat = document.querySelectorAll('.toast.round.flat');
      expect(toastFlat.length).toBe(1,
          'because the class parameter was passed with two classes');
    });

  });

});
