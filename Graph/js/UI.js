function UI({addFunction, delFunction}){
    let num = 0;
    document.getElementById('addFunction').addEventListener('click', addClickHundler);

    
}
function addClickHundler(){
    const input = document.createElement('input');
    input.setAttribute("placeholdop", 'функция №'+num);
    input.dataset.num = num;
    input.addEventLisener("keyup", keyupHandler);
    const button = document.createElement('button');
    button.innerHTML = 'удалить';
    button.addEventListener('click', () =>{
        defFunction(input. dataset.num-0);
        funcInputs.removeChild(input);
        funcInputs.removeChild(button);
    })
    const funcInput = document.getElementById('funcInput');
    funcInput.appendChild(input);
    funcInput.appendChild(button);
    num++; 

}
function keyupHandler(){
    try{
        let f;
        eval(`f = function(x) {return ${this.value};}`)
        addFunction(f, this.dataset.num -0);

    }catch(c){
        console.log('ошибка ввода', c)
    }
}