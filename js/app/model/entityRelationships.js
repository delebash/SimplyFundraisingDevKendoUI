/**
 * Defines entity relationships in a javascript object same as defined on server
 */
MyEntityRelations = {
    Contact : {
        manytoone : ["ContactType"],
        onetomany : ["Address"]
    },
    ContactType : {
        manytoone : [],
        onetomany : ["Contact"]
    },
        Address : {
        manytoone : ["Contact"],
        onetomany : []
    }
};

