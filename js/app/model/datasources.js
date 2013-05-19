/**
 * Gets a datasource
 * @param {String} mySchemaName         switch case for getMySchema().
 * @param {String} readEntity           odata Entity to read.
 * @param {String} cudEntity            odata Entity to update.
 * @param {String} params               any odata parameters such as $expand or $filter
 * @param {String} myParentEntity       parent entity name used in configureDataForWakandaDB
 * @param {String} myParentKey          parent record KeyID used in configureDataForWakandaDB
 * @param {String} myRelationShipType   relationshiptype "OneToMany" "ManyToOne" used in configureDataForWakandaDB
 * @return {Object}                     Returns a new dataSource.
 */
function getDS(mySchemaName, readEntity, cudEntity, params, myParentEntity, myParentKey, myRelationShipType) {

    var myScehma = getMySchema(mySchemaName);
    //Remote testing
    //var crudServiceBaseUrl = "http://ageektech.zapto.org:8081/cors/";
    //Local
    var crudServiceBaseUrl = "http://127.0.0.1:8081/cors/";
    var myData;
    var myDataSource = new kendo.data.DataSource({
        type : "json",
        transport : {
            read : {
                url : crudServiceBaseUrl + readEntity + params,
                dataType : "json",
                type : "GET"

            },
            update : {
                url : crudServiceBaseUrl + cudEntity + "/?$method=update",
                dataType : "json",
                type : "POST"
            },
            destroy : {
                url : function(entity) {
                    return crudServiceBaseUrl + cudEntity + "(" + entity.models[0].__KEY + ")/?$method=delete";
                },
                type : "POST"
            },
            create : {
                url : crudServiceBaseUrl + cudEntity + "/?$method=update",
                dataType : "json",
                type : "POST"
            },
            parameterMap : function(options, operation) { 
                if (operation == "create" || operation == "update") {
                    myData = options.models[0];
                    configureDataForWakandaDB(myParentEntity, myParentKey, myData, operation, myRelationShipType);
                    return JSON.stringify({
                        "__ENTITIES" : options.models
                    });
                }
            }
        },
        error : function(e) {
            this.cancelChanges();
            displayServerErrors(e);
           
        },
        change : function(e) {

        },
        sync : function(e) {
            // handle event
        },
        requestStart : function(e) {
            // handle event
        },
        requestEnd : function(e) {
            // handle event
        },
        serverPaging : true,
        serverSorting : true,
        serverFiltering : true,
        batch : true,
        pageSize : 30,
        schema : {
            model : myScehma,
            data : "__ENTITIES",
            errors : "__ERROR" // errors are returned in the "exceptions" field of the response
        }
    });

    return myDataSource;
}

