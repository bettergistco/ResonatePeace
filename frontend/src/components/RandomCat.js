import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

import './RandomCat.css';



class RandomCatPage extends React.Component {
    constructor(props) {
        super(props);

        // component state
        this.state = {
            catImage: 'https://cdn2.thecatapi.com/images/bkc.jpg',
        };

        this.handleFetchNextImage = this.handleFetchNextImage.bind(this);
    }

    componentDidMount() {
        $('input.url').on('click', function () {
            this.select();
        });
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
                    <button class="next" onClick={this.handleFetchNextImage}>Next Cat</button>
                    <div><input class="url" type="text" value={this.state.catImage}/></div>
                    <img id="centerPhoto" />
                </div>
            </div>
        </section>
        );
    }
}

export default RandomCatPage;




