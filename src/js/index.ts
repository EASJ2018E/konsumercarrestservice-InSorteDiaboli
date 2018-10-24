import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

    interface ICar {
        model:string;
        vendor:string;
        price:number;
    }

    let getAllCars:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllButton");
    getAllCars.addEventListener('click',showAllCars);

    function showAllCars():void {
        let uri:string = "http://rest-pele-easj-dk.azurewebsites.net/api/Cars";

        axios.get<ICar[]>(uri)
        .then(function (response:AxiosResponse<ICar[]>):void{

            let result:string = "<ol>";
            response.data.forEach((car:ICar)=>{
                result += "<li>" + car.model + car.vendor + car.price.toString() + "</li>"
            });
            result += "</ol>";
        }
        )
        .catch()
    }