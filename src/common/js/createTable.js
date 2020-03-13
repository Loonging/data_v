/**
 * Created by Fakin on 2019/8/14
 */
class CreateTable {
    // eslint-disable-next-line camelcase
    constructor({
        // eslint-disable-next-line camelcase
        create_time,
        key11,
        key13,
        key8,
        key12,
        lastdata
    }) {
        // eslint-disable-next-line camelcase
        this.date = create_time
        this.key11 = key11
        this.key13 = key13
        this.key12 = key12
        this.key8 = key8
        this.lastdata = lastdata
    }
}

function createTable(arr) {
    return arr.map(item => {
        // eslint-disable-next-line camelcase
        let {
            // eslint-disable-next-line camelcase
            create_time,
            value
        } = item
        let _value = JSON.parse(value)
        return new CreateTable({
            // eslint-disable-next-line camelcase
            create_time,
            key11: _value.key11,
            key13: _value.key13,
            key8: _value.key8,
            key12: _value.key12,
            lastdata: _value.lastdata
        })

    })
}

export {
    createTable
}