function bindParent(parentDS, myParentEntity, myData, myValidator, myForm, isEdit) {
    configureDataForWakandaDB(myParentEntity, myData[0], isEdit);
    addValidationAttributes(parentDS);
    //viewModel is same for add or edit
    var myViewModel = getViewModel(parentDS, myData[0], null, null, myValidator);
    //Bind to viewModel
    kendo.bind($('#' + myForm), myViewModel);
    //Redirect on Parent Record Save when data has finished updating so listview reflects current data
    parentDS.bind("sync", function(e) {
        window.location.href = "#/ContactList";
    });
}

function bindChildGrid(myParentEntity, myParentKey, myValidator) {
    //Child record
    var addressDS = getDSByName("AddressDS")
    var myChildViewModel = getViewModel(addressDS, {}, myParentKey, myParentEntity, null);
    //Bind ContactAddress Grid
    var addressContactDS = getDSByName("AddressContactDS", myParentKey);
    //Pass ViewModel to getGrid so the ViewModel selected record is set to current grid selected row
    getGrid("AddressContactGrid", addressContactDS, myChildViewModel);
    //Bind viewModel
    kendo.bind($("#addressdetail"), myChildViewModel);

    //Refresh grid after update
    addressDS.bind("sync", function(e) {
        var grid = $("#AddressContactGrid").data("kendoGrid");
        grid.dataSource.read();
    });
}
