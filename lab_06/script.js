let s = Number(prompt("Please input first number: "));
let y = Number(prompt("Please input second number: "));
let choise = Number(prompt("1-summary \n 2-subsrtaction \n 3-multiplication \n 4-deviding \n 5-exit"))

    if (choise==1){
        let summary = s+y;
        alert("Summary: " + summary);
}
    else if (choise==2){
        let substraction = s-y;
        alert("Substraction: "+ substraction);
    }
    else if (choise==3){
        alert(`Multiplication = ${s*y}`);
    }
    else if (choise==4){
        if (s,y == 0)
            alert("We can not deviding on zero");
        else
            alert(`Deviding = ${s/y}`);
    }
    else if(choise==5){
        alert("end")
    }
    else{
        alert("Input just 1,2,3,4 or 5!")
    }





