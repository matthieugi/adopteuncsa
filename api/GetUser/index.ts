import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const user = context.bindings.user as any[];

    context.log(user);

    if(user.length !== 0){
        context.res.body = JSON.stringify(user[0]);
    }
    else {
        context.res.status = 404;
    }
};

export default httpTrigger;