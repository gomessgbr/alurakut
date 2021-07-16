 import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request,response){
    if(request.method === 'POST'){
        const TOKEN = 'b61c6ec1241b53940ddd703d563d89';
    
        const client = new SiteClient(TOKEN);
        
        const registroCriado = await client.items.create({
            itemType: "966362",
            ...request.body,
            //title: "Comunidade Teste",
            //imageUrl: "https://github.com/gomessgbr.png",
    
        })
    
        response.json({
            dados:'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}