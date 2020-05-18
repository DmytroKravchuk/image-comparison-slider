"use strict";

class ComparisonSlider {
    constructor({container, slider, comparedImage, startPosition}) {
        this.container = document.querySelector(container);
        this.slider = document.querySelector(slider);
        this.comparedImage = document.querySelector(comparedImage);
        this.startPosition = startPosition;
    }

    init() {
        this._setParamsAndElements();
        this.slider.onmousedown = (e) => {
            e.preventDefault();
            this._setDragPosition(e);
        }
    }

    _setDragPosition(e) {
        let shiftX = e.clientX - e.target.getBoundingClientRect().left;
        let mouseMove = onMouseMove.bind(this);

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(e) {
            let newLeft = e.clientX - shiftX - this.container.getBoundingClientRect().x;

            if(newLeft < 0) {
                newLeft = 0;
            }

            if(newLeft > this.container.offsetWidth) {
                newLeft = this.container.offsetWidth;
            }

            this.slider.style.left = newLeft + 'px';
            this.comparedImage.style.width = newLeft + 'px';
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mousemove', onMouseUp);
        }
    }

    _setParamsAndElements() {
        this.slider.style.left = this.startPosition;
        this.comparedImage.style.width = this.startPosition;
    }

}

const slider = new ComparisonSlider({
    container: '.img-comp-container',
    slider: '.img-comp-slider',
    comparedImage: '.img-comp-overlay',
    startPosition: '50%'
});

slider.init();
