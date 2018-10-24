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

    function showAllCars():void {
        let uri:string = "http://resst-pele-easj-dk.azurewebsites.net/api/Cars";

        axios.get<ICar[]>(uri)
        .then(function (response:AxiosResponse<ICar[]>):void{

            let result:string = "<ol>";
            response.data.forEach((car:ICar)=>{
                result += "<li>" + "Model: " + car.model + " Mærke: " + car.vendor + " Pris: " + car.price.toString() + "</li>"
            });
            result += "</ol>";
            divContent.innerHTML = result;
        }
        )
        .catch(function (error:AxiosError):void{
            
                divContent.innerHTML = error.stack;
            
        })
    }