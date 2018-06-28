class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: []
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addNewFruit = this.addNewFruit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.deleteFruit = this.deleteFruit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateFruit = this.updateFruit.bind(this);
    }

    handleUpdate(fruit) {
        fetch(`/api/fruits/` + fruit.id,
            {
                method: 'PUT',
                body: JSON.stringify({ fruit: fruit }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.updateFruit(fruit)
            })
    }
    updateFruit(fruit) {
        let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
        newFruits.push(fruit)
        this.setState({
            fruits: newFruits
        })
    }

    handleDelete(id) {
        const URI = '/api/fruits/' + id;

        fetch(URI,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.deleteFruit(id);
            })
    }

    deleteFruit(id) {
        newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
        this.setState({
            fruits: newFruits
        })
    }

    componentDidMount() {
        fetch('/api/fruits')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data }) });
    }

    handleFormSubmit(name, description) {
        let body = JSON.stringify({ fruit: { name: name, description: description } })
        fetch('/api/fruits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => { return response.json() })
            .then((fruit) => {
                this.addNewFruit(fruit)
            })
    }

    addNewFruit(fruit) {
        this.setState({
            fruits: this.state.fruits.concat(fruit)
        })
    }

    render() {
        return (
            <div>
                <NewFruit handleFormSubmit={this.handleFormSubmit} />
                <AllFruits 
                        fruits={this.state.fruits} 
                        handleUpdate = {this.handleUpdate}
                        handleDelete={this.handleDelete} />
            </div>
        )
    }
}