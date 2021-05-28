const colorTags = [
    'color', 'background', 'widget', 'sell', 'buy'
];
var themes = [
    // default
    {
        name: 'Light',
        colorList: {
            color: {
                title: 'text',
                main: '#555',
                vice: '#409EFF',
            },
            background: {
                title: 'bg',
                main: "rgb(245 247 250)",
                vice: "white",
            },
            widget: {
                title: 'widget',
                main: 'white',
                vice: "#eee",
            },
            sell: {
                main: 'rgb(255, 39, 75)',
            },
            buy: {
                main: 'rgb(1, 195, 141)',
            },
        },
    },
    //dark
    {
        name: 'Dark',
        colorList: {
            color: {
                title: 'text',
                main: 'white',
                vice: '#dab866',
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