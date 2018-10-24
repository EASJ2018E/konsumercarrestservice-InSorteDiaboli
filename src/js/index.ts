//Importerer axios, så projektet ved hvor den skal hente disse specifikke funktioner fra axios i node_modules
import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

    interface ICar {
        model:string;
        vendor:string;
        price:number;
    }

    let divContent:HTMLDivElement = <HTMLDivElement> document.getElementById("content");
    let getAllCars:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
    getAllCars.addEventListener('click',showAllCars);

    let carAdd:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
    carAdd.addEventListener('click', addCar);

    let uri:string = "http://rest-pele-easj-dk.azurewebsites.net/api/Cars";

    let carDelete:HTMLButtonElement = <HTMLButtonElement> document.createElement("button");
    carDelete.setAttribute("id", "carDeleteButton");
    carDelete.setAttribute("value", "Delete");
    document.body.appendChild(carDelete);
    function showAllCars():void {
        
//Then bliver brugt hvis uri eksisterer/er den rigtige
//Altså så bliver then gennemløbet
        axios.get<ICar[]>(uri)
        .then(function (response:AxiosResponse<ICar[]>):void{
//Denne function opretter en ordered list og ligger derefter al dataen fra urien via interfacet ICar ned i <li></li> tags og til sidst lukker ordered list
            let result:string = "<ol>";
            response.data.forEach((car:ICar)=>{
                if(car)
                {
                //+= betyder at den ligger det oveni hvad result allerede indeholder
                    result += "<li>" + "Model: " + car.model + " Mærke: " + car.vendor + " Pris: " + car.price.toString() + "</li>" + "<button id='carDelete'>Delete" + "</button>"
                }
                else
                {
                    result += "<li><b> NULL element </b></li>"
                }
                
            });
            result += "</ol>";
            //Så her til sidst indeholder result: <ol> <li> Model: car.model Mærke: car.vendor Pris: car.price </li> </ol>
            //Alt det bliver så lagt ind i content
            divContent.innerHTML = result;
        }
        )
//Catch bliver brugt hvis der opstår errors, som fx i dette tilfælde at uri er ukorrekt
//Kan laves en .then efter en .catch som fungerer ligesom en finally i try/catch, altså bliver denne .then altid udført
        .catch(function (error:AxiosError):void{
            //Error viser stack
                divContent.innerHTML = error.stack;
            
        })
    }

    function addCar():void {
        let inputModel:HTMLInputElement =<HTMLInputElement> document.getElementById("addModel");
        let inputVendor:HTMLInputElement =<HTMLInputElement> document.getElementById("addVendor");
        let inputPrice:HTMLInputElement =<HTMLInputElement> document.getElementById("addPrice");

        let myModel:string = inputModel.value;
        let myVendor:string = inputVendor.value;
        //+ typecaster inputPrice.value til at være number istedet for string
        let myPrice:number = +inputPrice.value;

        axios.post<ICar>(uri,{model:myModel, vendor:myVendor, price:myPrice})
        .then((response:AxiosResponse) => {console.log("response " +response.status + " " + response.statusText)})
        .catch((error:AxiosError) => {console.log(error);})
        
        
    }