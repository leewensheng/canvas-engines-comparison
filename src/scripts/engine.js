import 'fpsmeter';

class Engine {
  constructor() {
    this.content = document.querySelector('main');
    this.meterContainer = this.content.querySelector('.meter');
    this.countLinks = this.content.querySelectorAll('.count-selector > a');

    this.width = Math.min(this.content.clientWidth, 1000);
    this.height = this.content.clientHeight * 0.75;
    this.count = 0;

    this.initFpsmeter();
    this.initSettings();
  }

  initFpsmeter() {
    this.meter = new window.FPSMeter(
      this.meterContainer, {
        graph: 1,
        heat: 1,
        theme: 'light',
        history: 25,
        top: 0,
        bottom: 40,
        left: `calc(${this.width}px + 2.5em)`,
        transform: 'translateX(-100%)',
      },
    );
  }

  initSettings() {
    const count = JSON.parse(localStorage.getItem('count'));

    this.count = count || { index: 0, value: 1000 };
    localStorage.setItem('count', JSON.stringify(this.count));

    this.countLinks.forEach((link, index) => {
      this.countLinks[this.count.index].classList.toggle('selected', true);

      link.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();

        this.countLinks[this.count.index].classList.toggle('selected', false);
        this.count = { index: index, value: parseInt(link.innerText) };
        this.countLinks[this.count.index].classList.toggle('selected', true);

        localStorage.setItem('count', JSON.stringify(this.count));

        this.render();
      });
    });
  }

  render() {}
}

export default Engine;
