class Reconstitution {
    constructor({
        a01002,
        w01001,
        name,
        a05001,
        a01001
    }) {
        this.name = name
        this.humidity = a01002
        this.PH = w01001
        this.CO2 = a05001
        this.temperature = a01001
    }

    createReconstitution(data) {
        return data.map(item => {
            let {
                name,
                a01002,
                w01001,
                a05001,
                a01001
            } = item
            return new reconstitution({
                name,
                humidity: a01002,
                PH: w01001,
                CO2: a05001,
                temperature: a01001
            })
        })
    }

}



export default {
    reconstitution
}