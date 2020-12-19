import React from 'react';

import './RandomCat.css';

class RandomCatPage extends React.Component {
    constructor(props) {
        super(props);

        // component state
        this.state = {
            catImage: 'https://cdn2.thecatapi.com/images/bkc.jpg',
            images: [
                'https://cdn2.thecatapi.com/images/da4.jpg',
            ]
        };

        this.handleFetchNextImage = this.handleFetchNextImage.bind(this);
    }

    componentDidMount() {
        $('input.url').on('click', function () {
            this.select();
        });

        $('#slideshow button#resonate').css('top', (window.innerHeight / 2) - 20);

        window.onresize = function (event) {
            $('#slideshow button#resonate').css('top',
                (event.currentTarget.innerHeight / 2) - 20);
        };
    }

    handleFetchNextImage() {
        fetch('https://api.thecatapi.com/v1/images/search', {
            method: 'GET',
            withCredentials: true,
            headers: {
                'X-API-Key': '5c91351a-8911-4f19-981e-687703970b2a',
            }
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({catImage: data[0].url});

                $('#slideshow').css('background-image', 'url("'+ data[0].url + '")')
            });
    }

    render() {
        return (
        <section id="slideshow">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-7 col-md-5 col-lg-4">
                    <button class="btn btn-light next" onClick={this.handleFetchNextImage}>Next Cat</button>
                    <div><input class="url" type="text" value={this.state.catImage}/></div>
                    <button id="resonate" class="btn btn-primary">Resonate</button>
                </div>
            </div>
        </section>
        );
    }
}

export default RandomCatPage;




