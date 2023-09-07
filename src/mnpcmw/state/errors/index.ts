interface LoggedError {
    error:any;
    time:Date;
    source:string;
}

const errorsArray :LoggedError[]=[];

export default {errorsArray}