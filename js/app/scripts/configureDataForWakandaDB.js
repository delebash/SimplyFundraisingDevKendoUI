/**
 * Function to configure dataRelations of parentDS to 1-n and n-1 dataSources
 * @param {String} myParentEntity       Name of parent Entity
 * @param {String} myParentKey          KeyId from parent record
 * @param {Object} myData               Data to be sent to server that needs modification before POST
 * @param {String} operation            Operation from dataSource parameterMap indicates create or update
 * @param {string} myRrelationShipType  Relationship type specified when dataSource was created "OneToMany" "ManyToOne"
 */
function configureDataForWakandaDB(myParentEntity, myParentKey, myData, operation, myRrelationShipType) {
    //Get n-1/1-n relations for parennt
    //Not note tranforming data toJSON so any change in myData affects myDS's data object
    if (cleanDataForWakanda(myData, operation)) {

        var myOneToMany = MyEntityRelations[myParentEntity].onetomany;
        var myManyToOne = MyEntityRelations[myParentEntity].manytoone;
        if (myRrelationShipType == "ManyToOne") {
            //for each myManyToOne in myDS do
            $.each(myManyToOne, function(key, value) {
                processManyToOne(value, myData, operation);
            });
        } else if (myRrelationShipType == "OneToMany") {
            processOneToMany(myData, myParentEntity, myParentKey, operation);
        }
    } else {
        alert("error in cleandata")
    }
    //End Function
}

function processManyToOne(value, myData, operation) {
    if (operation == "update") {
        var manyToOneKey = myData[value].__KEY;
        delete myData[value];
        myData[value] = {
            __KEY : manyToOneKey
        };
    } else if (operation == "create") {
        //Add ManyToOne to new record because its not defined in schema
        //KendoUI schema doesn't support hieriarchal data yet
        if (myData[value].length > 0) {
            myData[value] = {
                __KEY : myData[value]
            };
        } else {
            myData[value] = {
                __KEY : ""
            };
        }
    }
}

function processOneToMany(myData, myParentEntity, myParentKey, operation) {
    //Begin OneToMany

    if (operation == "update") {
        //Delete Parent record
        delete myData[myParentEntity];
    } else if (operation == "create") {//New Record
        //Delete and re-add only Parent Key
        delete myData[myParentEntity];
        myData[myParentEntity] = {
            __KEY : myParentKey
        }
    }
}

function cleanDataForWakanda(myData, operation) {
    delete myData.uri;
    delete myData.guid;
    if (operation == "create") {
        delete myData.__KEY;
        delete myData.__STAMP;
        delete myData.ID;
    }
    return true;
}