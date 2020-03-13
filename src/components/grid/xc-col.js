export default {
    name: 'XcCol',
    props: {
        column: {
            type: Number,
            default: 24
        },
        left: Number,
        right: Number
    },
    computed: {
        gutter() {
            let parent = this.$parent
            while (parent && parent.$options.componentName !== 'xc-row') {
                parent = parent.$parent
            }
            return parent ? parent.gutter : 0
        }
    },
    render(h) {
        let classList = []
        let style = {}
        if (this.gutter) {
            style.paddingLeft = this.gutter / 2 + 'px'
            style.paddingRight = style.paddingLeft
        }
        ['column', 'left', 'right'].forEach(v => {
            let item = this[v]
            if (item || item === 0) {
                classList.push(v !== 'column' ? `xc-col-${v}-${item}` : `xc-col-${item}`)
            }
        })
        return h('div', {
            class: ['xc-col', classList],
            style
        }, this.$slots.default)
    }

}