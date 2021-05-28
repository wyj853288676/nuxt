var BezierCurve = function(dots){
    if(arguments.length == 0 || dots.length < 2){
        console.error('dots : 至少需要两个点!');
    };
    if(this == window){
        return null;
    };
    //点去重
    this.dots = [];
    let coordinatesString =[];
    dots.forEach(function(v){
        let coordinate = { x : v['x']!=undefined ? v['x'] : v[0]  , y : v['y']!=undefined ? v['y'] : v[1] } ,
            cStr = coordinate.x + '-' + coordinate.y;
        if(coordinatesString.indexOf(cStr) >= 0){
            return true;
        };
        coordinatesString.push(cStr);
        this.dots.push(coordinate);
    },this);
    this.start = this.dots[0];
    this.end = this.dots[this.dots.length - 1];
};

Object.assign(BezierCurve.prototype,{
    getDot:function(index){
        let max , min ;
        if(this.start.x > this.end.x){
            max = this.start.x;
            min = this.end.x;
        }else{
            max = this.end.x;
            min = this.start.x;
        }
        index = Math.max(min,Math.min(max,index));
        let proportion = (index - this.start.x) / (this.end.x - this.start.x);
        let indexX = index;
        let indexY = this.start.y + proportion * (this.end.y - this.start.y);
        return BezierCurve.calc.call(this,this.dots,{
            x : indexX,
            y : indexY,
        });
    },
    print:function(){
        this.dots.map(function(v){
            return "[" + v.x + ',' + v.y + "]";
        });
        return "new Bezier( [ " + this.dots.join(',') + " ])";
    },
});

/**
 * 计算点的坐标
 */
BezierCurve.calc = function(dots,indexDot){
    if(dots.length <= 2){
        return indexDot;
    };
    let length = dots.length ;
    let proportion;
    if( dots[dots.length - 1].x != dots[0].x){
        proportion = (indexDot.x - dots[0].x) / (dots[dots.length - 1].x - dots[0].x);
    }else if(dots[dots.length - 1].y != dots[0].y){
        proportion = (indexDot.y - dots[0].y) / (dots[dots.length - 1].y - dots[0].y);
    }else{
        return indexDot;
    };

    let newDots = [];
    for(let i = 0;i <= (length - 2);i++){
        let dotSet = dots.slice(i,i + 2);
        newDots.push({
            x : (dotSet[1].x - dotSet[0].x) * proportion + dotSet[0].x,
            y : (dotSet[1].y - dotSet[0].y) * proportion + dotSet[0].y,
        });
    };
    //计算 新的点
    let newIndexDot = {
        x : ( newDots[newDots.length - 1].x - newDots[0].x ) * proportion + newDots[0].x ,
        y : ( newDots[newDots.length - 1].y - newDots[0].y ) * proportion + newDots[0].y ,
    };
    if(newDots.length <= 2){
        return newIndexDot;
    }else{
        return BezierCurve.calc(newDots,newIndexDot);
    }
};

module.exports = BezierCurve;