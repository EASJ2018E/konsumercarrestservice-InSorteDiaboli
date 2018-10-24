import axios, {
    AxiosResponse,
    AxiosError} from "../../node_modules/axios/index";

    //http://rest-pele-easj-dk.azurewebsites.net/api/Cars

    interface ICar {
        model:string;
        vendor:string;
        price:number;
    }