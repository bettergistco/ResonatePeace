import React from 'react';

import './RandomCat.css';

Math.random=(function(rand) {
    var salt=0;
    document.addEventListener('mousemove',function(event) {
        salt=event.pageX*event.pageY;
    });
    return function() { return (rand()+(1/(1+salt)))%1; };
})(Math.random);

function betterRandom(min, max) {
    // The defacto JavaScript way:
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class RandomCatPage extends React.Component {
    constructor(props) {
        super(props);

        this.isFirstVideo = true;

        // component state
        this.state = {
            catImage: 'https://cdn2.thecatapi.com/images/bkc.jpg',
            timeTilNext: -1,
            pauseLabel: 'Pause',
            timers: {},
            images: [
                'https://cdn2.thecatapi.com/images/da4.jpg',
                'https://cdn2.thecatapi.com/images/dnb.jpg',
                'https://cdn2.thecatapi.com/images/MTY4MDQ3NQ.jpg',
                'https://cdn2.thecatapi.com/images/d73.png',
                'https://cdn2.thecatapi.com/images/abl.jpg',
                'https://cdn2.thecatapi.com/images/MTkzMDA2Nw.gif'
            ],
            imgIndex: 0
        };

        this.decrementCountdown = this.decrementCountdown.bind(this);
        this.handleFetchNextImage = this.handleFetchNextImage.bind(this);
        this.pauseSlideshow = this.pauseSlideshow.bind(this);
        this.resumeSlideshow = this.resumeSlideshow.bind(this);
        this.startSlideshow = this.startSlideshow.bind(this);
    }

    componentDidMount() {
        $('input.url').on('click', function () {
            this.select();
        });

        $('#slideshow button.vcenter').css('top', (window.innerHeight / 2) - 20);

        window.onresize = function (event) {
            $('#slideshow button.vcenter').css('top',
                (event.currentTarget.innerHeight / 2) - 20);
        };
    }

    decrementCountdown() {
        if (this.state.timeTilNext <= 0) {
            window.clearInterval(this.state.timers.countdownInterval);
            // Set up the next slide
            const slideshowTimeout = setTimeout(() => {
                this.startSlideshow();
            }, 100);

            // Store the timeout in state
            this.setState(prevState => ({
                timers: {
                    ...prevState.timers,
                    slideshowTimeout: slideshowTimeout
                }
            }));
            return;
        }

        this.setState({
            timeTilNext: this.state.timeTilNext - 10
        });
    }

    fetchInspirationalVideo() {
        const inspirationalVideos = [
            "OPR3GlpQQJA",
            "TCcTJjLFDE8",
            "AkhPm7UoIzY",
            "7AV_WmEKUgk",
            "03IOxDccRnM",
            "u9Dg-g7t2l4",
        ];

        return inspirationalVideos[betterRandom(0, inspirationalVideos.length - 1)];
    }

    handleFetchNextImage() {
        const preloadImage = function (url, callback) {
            var image = new Image();
            image.src = url;
            image.onload = callback;
        };

        const changeImage = (kittyURL) => {
            $('<img/>').attr('src', kittyURL).on('load', () => {
                $(this).remove(); // prevent memory leaks as @benweet suggested
                $('#slideshow').css('background-image', 'url('+ kittyURL + ')');

                const countdownInterval = setInterval(() => {
                    this.decrementCountdown();
                }, 10);

                // Update timers state preserving any existing timers
                this.setState(prevState => ({
                    timers: {
                        ...prevState.timers,
                        countdownInterval: countdownInterval
                    }
                }));
            });
        }

        let kittyURL;

        const diceRolls = betterRandom(1, 6) + betterRandom(1, 6);
        // Show an inspirational video if dice are rolled just right.
        if (diceRolls === 2 || diceRolls === 12) {
            const $slideshow = $('#slideshow');
            const videoURI = this.isFirstVideo ? "fcPWU59Luoc" : this.fetchInspirationalVideo();
            this.isFirstVideo = false;

            const embedHTML = `<iframe src="https://www.youtube.com/embed/${videoURI}?autoplay=1" allow="autoplay"></iframe>`;
            $slideshow.css('background', 'url(https://techcrunch.com/wp-content/uploads/2015/08/clouds.jpg) center center fixed');
            $slideshow.append($(embedHTML));

            return;
        }

        if (this.state.imgIndex >= this.state.images.length) {
            fetch('https://api.thecatapi.com/v1/images/search', {
                method: 'GET',
                withCredentials: true,
                headers: {
                    'X-API-Key': '5c91351a-8911-4f19-981e-687703970b2a',
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    kittyURL = data[0].url;
                    this.setState({catImage: kittyURL});
                    preloadImage(kittyURL, () => {
                        changeImage(kittyURL);
                    });
                });
        } else {
            kittyURL = this.state.images[this.state.imgIndex];
            preloadImage(kittyURL);
            this.setState({
                catImage: kittyURL,
                imgIndex: this.state.imgIndex + 1 // Fixed: use this.state.imgIndex + 1 instead of ++this.state.imgIndex
            });

            changeImage(kittyURL);
        }
    }

    pauseSlideshow() {
        if (this.state.pauseLabel === 'Resume') {
            this.resumeSlideshow();
            return;
        }

        // Clear all active timers
        if (this.state.timers.countdownInterval) {
            window.clearInterval(this.state.timers.countdownInterval);
        }
        if (this.state.timers.slideshowTimeout) {
            window.clearTimeout(this.state.timers.slideshowTimeout);
        }

        this.setState({pauseLabel: 'Resume'});
    }

    resumeSlideshow() {
        this.setState({pauseLabel: 'Pause'});

        // If we have a time remaining, restart the countdown
        if (this.state.timeTilNext > 0) {
            const countdownInterval = setInterval(() => {
                this.decrementCountdown();
            }, 10);

            // Update timers state preserving any existing timers
            this.setState(prevState => ({
                timers: {
                    ...prevState.timers,
                    countdownInterval: countdownInterval
                }
            }));
        } else {
            // Otherwise, start a new slideshow
            this.startSlideshow();
        }
    }

    startSlideshow() {
        const $countdown = $('#slideshow #countdown');
        const timeInterval = betterRandom(10, 30) * 1000;

        this.setState({timeTilNext: timeInterval});

        $countdown.removeClass('d-none');
        $('button#resonate').addClass('d-none');
        $('button#pause').removeClass('d-none');

        this.handleFetchNextImage();
    }

    render() {
        return (
            <section id="slideshow">
                <div id="countdown" className="d-none">{this.state.timeTilNext}</div>
                <div className="row justify-content-center">
                    <div className="col-10 col-sm-7 col-md-5 col-lg-4">
                        <button className="controls btn btn-light next" onClick={this.handleFetchNextImage}>Next Cat</button>
                        <div><input className="controls url" type="text" value={this.state.catImage}/></div>
                        <button id="resonate" className="controls vcenter btn btn-primary" onClick={this.startSlideshow}>Resonate</button>
                        <button id="pause" className="controls vcenter btn btn-primary d-none" onClick={this.pauseSlideshow}>{ this.state.pauseLabel }</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default RandomCatPage;
