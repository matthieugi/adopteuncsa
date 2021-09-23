import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');

    context.log(decoded);
    let user = JSON.parse(decoded);
    context.log(user);
    context.log(context.req.body);
    user.profile = context.req.body;

    context.bindings.users = user;

};

export default httpTrigger;