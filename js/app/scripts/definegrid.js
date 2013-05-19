/**
 * Creates a KendoUI DataGrid from the specified html input element id
 * @param {String} GridID           Html ID of the input element to be turned into KendoUI Widget
 * @param {Object} GridDS           dataSource that will be bound to the dropDownList
 * @param {Object} [myViewModel]    If dataGrid is associated with viewModel input elements then change event will set viewModel selected to current grid row
 */
function getGrid(GridID, GridDS, myViewModel) {
    var selectedRows;
    var dataItem;
    var myItems;
    var MyTestKey;
    switch(GridID) {
        case "ContactContactTypeGrid":
            $('#' + GridID).kendoGrid({
                selectable : "row",
                filterable : true,
                pageable : true,
                sortable : true,
                change : function(e) {
                    //Used to test change event firing twice on same selected row for dblclick
                    selectedRows = this.select();
                    dataItem = this.dataItem(selectedRows);
                    MyTestKey = dataItem.__KEY;
                    if (MyTestKey != MyDataKey) {
                        //toJson just gets the data not all the other observable objects and events
                        myItems = dataItem.toJSON();
                        DataRows.push(myItems);
                        //Set KEY = id in url
                        //MyDataKey has to be global to prevent change event fireing twice on dblclcik
                        MyDataKey = dataItem.__KEY;
                    }
                },
                dataSource : GridDS,
                columns : [{
                    field : "ID"
                }, {
                    field : "firstName",
                    title : "First Name"
                }, {
                    field : "middleName",
                    title : "Middle Name"
                }, {
                    field : "lastName",
                    title : "Last Name"
                }, {
                    field : "ContactType.name",
                    title : "Contact Type"
                }]
            });
            //Handles doubleclick
            $('#' + GridID + ' table tr').live('dblclick', function(e) {
                window.location.href = '#/ContactDetail?ID=' + MyDataKey;
            });
            break;
        case "AddressContactGrid":
            $('#' + GridID).kendoGrid({
                selectable : "row",
                filterable : true,
                pageable : true,
                sortable : true,
                change : function(e) {
                    selectedRows = this.select();
                    dataItem = this.dataItem(selectedRows);
                    //toJson just gets the data not all the other observable objects and events
                    myItems = dataItem.toJSON();
                    myViewModel.set("selectedRecord", myItems);
                    myViewModel.set("selected", true);
                },
                dataSource : GridDS,
                columns : [{
                    field : "street"
                }]
            });
            break;
    }
    return GridID;}
