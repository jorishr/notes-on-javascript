//let keyword creates a local scope whereby i is stored a closure in callback fn
for(let i = 0; i < 3; i++){
    setTimeout(() => {
        console.log(i);
    }, 1000);
    console.dir(() => console.log(i))
}

//no closure because var is a global var
for(var i = 0; i < 3; i++){
    setTimeout(() => {
        console.log(i);
    }, 1000);
    console.dir(() => console.log(i))
}
//i is now a parameter of outer function with local scope, thus stored as closure in cb function 
for(var i = 0; i < 3; i++){
    (function(i){
        setTimeout(() => {
            console.log(i);
        }, 1000);
        console.dir(() => console.log(i))
    })(i)
}

const getData = async () => {
    try {
        const res  = await fetch('api');
        const data = await res.json();

    } catch (err){
        console.error(err);
    }
}