export default {
    name: 'XcRow',
    componentName: 'xc-row',
    props: {
        space: Number
    },

    render(h) {
        let style = {}
        if (this.space) {
            style.marginLeft = `-${this.space/2}px`
            style.marginRight = style.marginLeft
        }
        return h('div', {
            class: 'xc-row',
            style
        }, this.$slots.default)
    }
}