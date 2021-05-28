const colorTags = [
    'color', 'background', 'widget', 'sell', 'buy'
];
var themes = [
    // default
    {
        name: 'default',
        colorList: {
            color: {
                title: 'text',
                main: '#555',
                vice: 'rgb(144 147 153)',
            },
            background: {
                title: 'bg',
                main: "white",
                vice: "rgb(245 247 250)",
            },
        },
    },
    // blue
    {
        name: 'blue',
        colorList: {
            color: {
                title: 'text',
                main: 'white',
                vice: '#66b1ff',
            },
            background: {
                title: 'bg',
                main: "rgb(21, 42, 71)",
                vice: "#2C4676",
            },
            widget: {
                title: 'widget',
                main: 'rgb(61 81 118)',
                vice: "#6a7682",
            },
            form: {
                visible: false,
                main: "#409EFF",
                light: '#ecf5ff',
            },
            sell: {
                main: '#f56c6c',
                vice: '#be5858',
            },
            buy: {
                main: '#67c23a',
                vice: '#02745a',
            }
        },
    },
    //dark
    {
        name: 'dark',
        colorList: {
            color: {
                title: 'text',
                main: 'white',
                vice: '#dab866',
                light: '#f1ede4',
                deep: '#8d7740',
            },
            background: {
                title: 'bg',
                main: "rgb(45 45 45)",
                vice: "#3b3b3b",
            },
            widget: {
                title: 'widget',
                main: '#4d4d4b',
                vice: "#52514e",
            },
            sell: {
                main: '#409EFF',
                vice: '#a3cbf4',
            },
            buy: {
                main: '#a3cbf4',
            },
        },
    }
];

//fix themes' colorList
for (var i = 0; i < themes.length; i++) {
    var colorList = themes[i].colorList;
    for (var j = 0; j < colorTags.length; j++) {
        var colorType = colorTags[j];
        if (colorList[colorType] === undefined) {
            colorList[colorType] = {};
        }
    }
}


module.exports = {
    themes: themes,
    colorTags: colorTags,
}