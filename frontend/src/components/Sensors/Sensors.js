import React from 'react';

function Sensors(){


    // Нужно подумать как загружать информацию в датчики (Exhauster)


    // N
    let N = 0

    // Если пришли цыфты, то в зависимости от них получаем цвет
    // <= 100   - def
    // > 100    - juellow
    // > 200    - red

    N <= 100 ? this.obj = 'def' : this.obj = 'juellow'
    N > 200 ?  this.obj = 'red' : null


    return (
        <div>
            
        </div>
    );
};

export default Sensors;