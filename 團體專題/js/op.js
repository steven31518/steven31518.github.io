var animation = anime.timeline({});
        animation
        .add({
          targets: '#mountain-op',
          bottom: '0px',
          duration: 1000,
          easing: 'easeInOutSine' 
        })

        .add({
          targets: '#could-op',
          bottom: '0px',
          duration: 1000,
          easing: 'easeInOutSine' 
        })

        .add({
          targets: '#sun-op',
          top: '0px',
          duration: 1000,
          easing: 'easeInOutSine' 
        })

        .add({
          targets: '#grass-op',
          bottom: '0px',
          duration: 1000,
          easing: 'easeInOutSine' 
        })

        .add({
          targets: '#title1-op',
          top: '0px',
          duration: 1000,
          easing: 'easeInOutSine'
          
        })
        .add({
          targets: '#title2-op',
          top: '0px',
          duration: 1000,
          easing: 'spring' 
        })

        setTimeout(() => {
          console.log("Delayed for 1 second.");
          document.querySelector('.background-color-op').classList.add('opacity0');
        }, "6000")
        setTimeout(() => {
          document.querySelector('body').style.overflow="visible";
          document.querySelector('.background-color-op').classList.add('hidden');
          document.querySelector('.menu').classList.remove('hidden');


        }, "7000")