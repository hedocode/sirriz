function getJsonByRequest(json, request){
    if(request != undefined){
        if(request.query != undefined){
            if(request.query.title != undefined){
                json = json.series[request.query.title];
                if(request.query.s != undefined){
                    json = json[request.query.s - 1];
                    if(request.query.e != undefined){
                        json = json[request.query.e - 1];
                    }
                }
            }
        }
    }
    return json;
}

module.exports.getJsonByRequest = getJsonByRequest;