module.exports = [{
        name: 'marketPrice',
        title: 'Market Price',
        size: {
            x: 1,
            y: 1,
            minX: 1,
            maxY: 2,
            maxX: 2,
        },
        thumbnail: {
            type: 'component',
            name: 'mp-thumbnail',
        },

        popout: true,
    },
    {
        name: 'creditStatus',
        title: 'Credit Status',
        size: {
            x: 1,
            y: 2,
            maxX: 2,
            maxY: 3,
            minY: 2,
        },
        thumbnail: {
            type: 'component',
            name: 'credit-status-thumbnail',
        },
    },
    {
        name: 'vwapMarketWithBook',
        title: 'Vwap Market Width Book',
        size: {
            x: 1,
            y: 2,
            maxX: 2,
            minY: 2,
        },
        thumbnail: {
            type: 'component',
            name: 'vmwb-thumbnail',
        },
    },
    {
        name: 'ccyPairGraph',
        title: 'CCY Pair Graph',
        size: {
            x: 1,
            y: 2,
            maxX: 2,
            minY: 2,
        },
        thumbnail: {
            type: 'component',
            name: 'cpg-thumbnail',
        },
    },
    {
        name: 'ccyPairSelection',
        title: 'CCY Pair Selection',
        size: {
            x: 1,
            y: 2,
            minX: 1,
            maxX: 4,
            minY: 2,
        },
        thumbnail: {
            type: 'component',
            name: 'cps-thumbnail',
        },
    },
    {
        name: 'orderDashboard',
        title: 'Order Dashboard',
        size: {
            x: 1,
            y: 3,
            minX: 1,
            maxX: 3,
            minY: 3,
            maxY: 4
        },
        thumbnail: {
            type: 'component',
            name: 'od-thumbnail',
        },
    },
];