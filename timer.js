function Timer(code){
    this.code = code;
    this.run = async function(){
        start = Date.now();
        await this.code();
        return Date.now() - start;
    };
    this.start = function(){
      return this.run(); 
    };
}
function timeSort(algorithm){
    (new Timer(selectionSort)).start().then((time) => {console.log(time);});
}
