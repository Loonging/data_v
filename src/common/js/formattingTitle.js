class Title {
    constructor({
        channelName,
        key
    }) {
        this.channelName = channelName
        this.key = key
    }

}

function createTitle(data) {
    return data.map((item) => {
        let {
            value,
            key
        } = item
        return new Title({
            channelName: value,
            key: key
        })
    })
}


export {
    createTitle
}