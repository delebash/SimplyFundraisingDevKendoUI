/**
 * Gets a Model Schema
 * @param {String} mySchema        switch case string.
 * @return {Object}                 Returns a Model for a datasource.
 */
function getMySchema(mySchema) {
    var mymySchema = null;
    switch(mySchema) {
        case 'Contact':
            mySchema = kendo.data.Model.define({
                id : "__KEY",
                fields : {
                    __KEY : {
                        type : "string"
                    },
                    __STAMP : {
                        type : "number"
                    },
                    ID : {
                        editable : false,
                        nullable : true
                    },
                    firstName : {
                        type : "string",
                        validation : {
                            required : true
                        }
                    },
                    middleName : {
                        type : "string"
                    },
                    lastName : {
                        type : "string",
                        validation : {
                            required : true
                        }
                    },
                    ContactType : {
                        validation : {
                            required : true
                        }
                    }
                }
            });
            break;
        case 'Address':
            mySchema = kendo.data.Model.define({
                id : "__KEY",
                fields : {
                    __KEY : {
                        type : "string"
                    },
                    __STAMP : {
                        type : "number"
                    },
                    ID : {
                        editable : false,
                        nullable : true
                    },
                    street : {
                        type : "string",
                        validation : {
                            required : true
                        }
                    }

                }
            });
            break;
        case 'ContactType':
            mySchema = kendo.data.Model.define({
                id : "__KEY",
                fields : {
                    __KEY : {
                        type : "string"
                    },
                    __STAMP : {
                        type : "number"
                    },
                    ID : {
                        editable : false,
                        nullable : true
                    },
                    name : {
                        type : "string",
                        validation : {
                            required : true
                        }
                    }
                }
            });
            break;
    }

    return mySchema;
}
