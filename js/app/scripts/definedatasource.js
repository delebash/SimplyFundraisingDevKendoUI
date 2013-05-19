/**
 * Gets a datasourse from GetDS() by predifining variables
 * @param {String} name                 switch case select.
 * @param {String} [parentRecordKey]    optional used to get a subset datasource 1-n of parent datasource
 * @return {Object}                     Returns a new predefined dataSource.
 */
function getDSByName(name, parentRecordKey) {
    var MyDSPredefined = null;
    switch(name) {
        case "ContactDS" :
            MyDSPredefined = getDS('Contact', 'Contact', 'Contact', '');
            break;
        case "ContactTypeDS" :
            MyDSPredefined = getDS('ContactType', 'ContactType', '', '');
            break;
        case "AddressContactDS" :
            MyDSPredefined = getDS('Address', 'Contact', 'Address', '(' + parentRecordKey + ')/?$expand=addressCollection&$method=subentityset','Contact',parentRecordKey,"OneToMany");
            break;
        case "AddressDS" :
            MyDSPredefined = getDS('Address', 'Address', 'Address', '');
            break;
        case "ContactContactTypeDS" :
            MyDSPredefined = getDS('Contact', 'Contact', 'Contact', '/?$expand=ContactType','Contact',parentRecordKey,"ManyToOne");
            break;
    }
    return MyDSPredefined;
}
