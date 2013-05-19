function getGridColumns(myEntityName) {
    var myGridColumns = [];
    var myObj;
    switch(myEntityName) {
        case 'Contact' :
            myGridColumns = [{
                field : "firstName",
                title : "First Name",
                width : 60
            }, {
                field : "middleName",
                title : "Middle Name",
                width : 60
            }, {
                field : "lastName",
                title : "Last Name",
                width : 60
            }, {
                field : "ContactType.name",
                title : "Contact Type",
                width : 60
            }];
            break;
        case 'Address' :
            myGridColumns = [{
                field : "ID"
            }, {
                field : "street",
                title : "street"
            }];
            break;
    }

    //Push static column params to GridColumns
    myObj = {
        command : [{
            name : "edit",
            text : {// sets the text of the "Edit", "Update" and "Cancel" buttons
                edit : "Edit",
                update : "Update",
                cancel : "Cancel"
            },
        }, {
            name : "destroy",
            text : "Delete"
        } // sets the text of the "Delete" button
        ],
        // sets the title and the width of the commands column
        title : "&nbsp;",
        width : "90px"
    }
    myGridColumns.push(myObj)
    return myGridColumns
}